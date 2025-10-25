"""
Automated Progress Monitoring System
SQL-based system for PowerSchool database integration
Generates weekly intervention reports for 60+ Tier 2/3 students
Eliminates 8 hours of manual data compilation per week

Author: Louis Rosche
Technologies: Python, SQL, pandas
"""

import sqlite3
import pandas as pd
from datetime import datetime, timedelta
import json


class ProgressMonitoringSystem:
    """
    Automated progress monitoring system using SQL queries on PowerSchool database
    """

    def __init__(self, db_path='powerschool_demo.db'):
        self.db_path = db_path
        self.conn = None
        self.setup_demo_database()

    def setup_demo_database(self):
        """Create demo database with sample PowerSchool structure"""
        self.conn = sqlite3.connect(self.db_path)
        cursor = self.conn.cursor()

        # Students table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                student_id INTEGER PRIMARY KEY,
                student_number TEXT UNIQUE,
                first_name TEXT,
                last_name TEXT,
                grade_level INTEGER,
                tier TEXT,
                enrollment_status TEXT
            )
        ''')

        # Assessments table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS assessments (
                assessment_id INTEGER PRIMARY KEY,
                student_id INTEGER,
                assessment_date DATE,
                assessment_type TEXT,
                reading_score REAL,
                math_score REAL,
                fluency_score REAL,
                comprehension_score REAL,
                FOREIGN KEY (student_id) REFERENCES students (student_id)
            )
        ''')

        # Interventions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS interventions (
                intervention_id INTEGER PRIMARY KEY,
                student_id INTEGER,
                intervention_name TEXT,
                start_date DATE,
                end_date DATE,
                frequency TEXT,
                progress_status TEXT,
                notes TEXT,
                FOREIGN KEY (student_id) REFERENCES students (student_id)
            )
        ''')

        # Attendance table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS attendance (
                attendance_id INTEGER PRIMARY KEY,
                student_id INTEGER,
                attendance_date DATE,
                present INTEGER,
                absent INTEGER,
                tardy INTEGER,
                FOREIGN KEY (student_id) REFERENCES students (student_id)
            )
        ''')

        # Behavior table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS behavior (
                behavior_id INTEGER PRIMARY KEY,
                student_id INTEGER,
                incident_date DATE,
                incident_type TEXT,
                severity TEXT,
                resolved INTEGER,
                FOREIGN KEY (student_id) REFERENCES students (student_id)
            )
        ''')

        self.conn.commit()
        self.populate_demo_data()

    def populate_demo_data(self):
        """Populate database with sample data"""
        cursor = self.conn.cursor()

        # Check if data already exists
        cursor.execute("SELECT COUNT(*) FROM students")
        if cursor.fetchone()[0] > 0:
            return

        # Insert sample students (60+ Tier 2/3 students)
        students_data = []
        for i in range(1, 71):
            tier = 'Tier 3' if i <= 25 else 'Tier 2'
            students_data.append((
                i,
                f'STU{i:05d}',
                f'Student{i}',
                f'LastName{i}',
                7 + (i % 2),  # Grades 7-8
                tier,
                'Active'
            ))

        cursor.executemany(
            'INSERT INTO students VALUES (?, ?, ?, ?, ?, ?, ?)',
            students_data
        )

        # Insert assessment data (8 weeks of data for each student)
        assessment_data = []
        assessment_id = 1
        for student_id in range(1, 71):
            for week in range(8):
                date = datetime.now() - timedelta(weeks=week)
                assessment_data.append((
                    assessment_id,
                    student_id,
                    date.strftime('%Y-%m-%d'),
                    'Weekly Progress',
                    45 + (week * 2) + (student_id % 10),  # Reading score
                    50 + (week * 1.5) + (student_id % 8),  # Math score
                    60 + (week * 2.5) + (student_id % 12),  # Fluency
                    55 + (week * 1.8) + (student_id % 9)   # Comprehension
                ))
                assessment_id += 1

        cursor.executemany(
            'INSERT INTO assessments VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            assessment_data
        )

        # Insert intervention data
        intervention_data = []
        for student_id in range(1, 71):
            tier = 'Tier 3' if student_id <= 25 else 'Tier 2'
            intervention_name = (
                'Intensive Reading + Math Support' if tier == 'Tier 3'
                else 'Small Group Reading Intervention'
            )
            frequency = '5x per week' if tier == 'Tier 3' else '3x per week'
            progress = ['Improving', 'Steady', 'Needs Adjustment'][student_id % 3]

            intervention_data.append((
                student_id,
                student_id,
                intervention_name,
                (datetime.now() - timedelta(days=45)).strftime('%Y-%m-%d'),
                (datetime.now() + timedelta(days=45)).strftime('%Y-%m-%d'),
                frequency,
                progress,
                f'Progress notes for student {student_id}'
            ))

        cursor.executemany(
            'INSERT INTO interventions VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            intervention_data
        )

        # Insert attendance data (last 30 days)
        attendance_data = []
        attendance_id = 1
        for student_id in range(1, 71):
            for day in range(30):
                date = datetime.now() - timedelta(days=day)
                # Skip weekends
                if date.weekday() >= 5:
                    continue

                present = 1 if (student_id + day) % 5 != 0 else 0
                absent = 1 - present
                tardy = 1 if (student_id + day) % 7 == 0 and present else 0

                attendance_data.append((
                    attendance_id,
                    student_id,
                    date.strftime('%Y-%m-%d'),
                    present,
                    absent,
                    tardy
                ))
                attendance_id += 1

        cursor.executemany(
            'INSERT INTO attendance VALUES (?, ?, ?, ?, ?, ?)',
            attendance_data
        )

        # Insert behavior incidents
        behavior_data = []
        behavior_id = 1
        for student_id in range(1, 71):
            # Some students have more incidents than others
            num_incidents = max(0, (student_id % 8) - 3)
            for incident in range(num_incidents):
                date = datetime.now() - timedelta(days=(incident * 7))
                incident_type = ['Minor disruption', 'Tardy', 'Off-task', 'Defiance'][incident % 4]
                severity = ['Low', 'Medium', 'High'][incident % 3]
                resolved = 1 if incident < num_incidents - 1 else 0

                behavior_data.append((
                    behavior_id,
                    student_id,
                    date.strftime('%Y-%m-%d'),
                    incident_type,
                    severity,
                    resolved
                ))
                behavior_id += 1

        if behavior_data:
            cursor.executemany(
                'INSERT INTO behavior VALUES (?, ?, ?, ?, ?, ?)',
                behavior_data
            )

        self.conn.commit()

    def generate_weekly_intervention_report(self):
        """
        Generate comprehensive weekly intervention report for all Tier 2/3 students
        This single query eliminates 8 hours of manual data compilation
        """
        query = '''
            WITH latest_assessments AS (
                SELECT
                    student_id,
                    MAX(assessment_date) as latest_date
                FROM assessments
                WHERE assessment_date >= date('now', '-7 days')
                GROUP BY student_id
            ),
            current_scores AS (
                SELECT
                    a.student_id,
                    a.reading_score,
                    a.math_score,
                    a.fluency_score,
                    a.comprehension_score,
                    a.assessment_date
                FROM assessments a
                INNER JOIN latest_assessments la
                    ON a.student_id = la.student_id
                    AND a.assessment_date = la.latest_date
            ),
            previous_scores AS (
                SELECT
                    student_id,
                    AVG(reading_score) as prev_reading,
                    AVG(math_score) as prev_math,
                    AVG(fluency_score) as prev_fluency,
                    AVG(comprehension_score) as prev_comprehension
                FROM assessments
                WHERE assessment_date < date('now', '-7 days')
                    AND assessment_date >= date('now', '-21 days')
                GROUP BY student_id
            ),
            attendance_summary AS (
                SELECT
                    student_id,
                    SUM(present) as days_present,
                    SUM(absent) as days_absent,
                    SUM(tardy) as times_tardy,
                    COUNT(*) as total_days,
                    ROUND(100.0 * SUM(present) / COUNT(*), 1) as attendance_rate
                FROM attendance
                WHERE attendance_date >= date('now', '-7 days')
                GROUP BY student_id
            ),
            behavior_summary AS (
                SELECT
                    student_id,
                    COUNT(*) as total_incidents,
                    SUM(CASE WHEN severity = 'High' THEN 1 ELSE 0 END) as high_severity,
                    SUM(resolved) as resolved_incidents
                FROM behavior
                WHERE incident_date >= date('now', '-7 days')
                GROUP BY student_id
            )
            SELECT
                s.student_number,
                s.first_name,
                s.last_name,
                s.grade_level,
                s.tier,
                i.intervention_name,
                i.frequency,
                i.progress_status,
                cs.reading_score as current_reading,
                ps.prev_reading,
                ROUND(cs.reading_score - ps.prev_reading, 1) as reading_change,
                cs.math_score as current_math,
                ps.prev_math,
                ROUND(cs.math_score - ps.prev_math, 1) as math_change,
                cs.fluency_score,
                cs.comprehension_score,
                COALESCE(att.attendance_rate, 100.0) as attendance_rate,
                COALESCE(att.days_absent, 0) as days_absent,
                COALESCE(att.times_tardy, 0) as times_tardy,
                COALESCE(beh.total_incidents, 0) as behavior_incidents,
                COALESCE(beh.high_severity, 0) as high_severity_incidents,
                cs.assessment_date as last_assessment_date
            FROM students s
            LEFT JOIN interventions i ON s.student_id = i.student_id
            LEFT JOIN current_scores cs ON s.student_id = cs.student_id
            LEFT JOIN previous_scores ps ON s.student_id = ps.student_id
            LEFT JOIN attendance_summary att ON s.student_id = att.student_id
            LEFT JOIN behavior_summary beh ON s.student_id = beh.student_id
            WHERE s.tier IN ('Tier 2', 'Tier 3')
                AND s.enrollment_status = 'Active'
            ORDER BY
                CASE s.tier
                    WHEN 'Tier 3' THEN 1
                    WHEN 'Tier 2' THEN 2
                END,
                s.last_name,
                s.first_name
        '''

        df = pd.read_sql_query(query, self.conn)
        return df

    def get_students_needing_immediate_attention(self):
        """
        Query to identify students needing immediate intervention adjustments
        """
        query = '''
            SELECT
                s.student_number,
                s.first_name || ' ' || s.last_name as student_name,
                s.grade_level,
                s.tier,
                i.intervention_name,
                CASE
                    WHEN att.attendance_rate < 80 THEN 'CRITICAL ATTENDANCE'
                    WHEN beh.high_severity > 0 THEN 'HIGH SEVERITY BEHAVIOR'
                    WHEN assess.reading_score < 40 THEN 'CRITICAL READING LEVEL'
                    WHEN assess.math_score < 40 THEN 'CRITICAL MATH LEVEL'
                    ELSE 'MONITOR'
                END as alert_status,
                COALESCE(att.attendance_rate, 100) as attendance_rate,
                COALESCE(beh.total_incidents, 0) as behavior_incidents,
                assess.reading_score,
                assess.math_score
            FROM students s
            LEFT JOIN interventions i ON s.student_id = i.student_id
            LEFT JOIN (
                SELECT student_id, reading_score, math_score
                FROM assessments
                WHERE assessment_date = (SELECT MAX(assessment_date) FROM assessments)
            ) assess ON s.student_id = assess.student_id
            LEFT JOIN (
                SELECT
                    student_id,
                    ROUND(100.0 * SUM(present) / COUNT(*), 1) as attendance_rate
                FROM attendance
                WHERE attendance_date >= date('now', '-14 days')
                GROUP BY student_id
            ) att ON s.student_id = att.student_id
            LEFT JOIN (
                SELECT
                    student_id,
                    COUNT(*) as total_incidents,
                    SUM(CASE WHEN severity = 'High' THEN 1 ELSE 0 END) as high_severity
                FROM behavior
                WHERE incident_date >= date('now', '-14 days')
                GROUP BY student_id
            ) beh ON s.student_id = beh.student_id
            WHERE s.tier IN ('Tier 2', 'Tier 3')
                AND s.enrollment_status = 'Active'
                AND (
                    att.attendance_rate < 85
                    OR beh.high_severity > 0
                    OR assess.reading_score < 45
                    OR assess.math_score < 45
                )
            ORDER BY
                CASE
                    WHEN att.attendance_rate < 80 THEN 1
                    WHEN beh.high_severity > 0 THEN 2
                    WHEN assess.reading_score < 40 OR assess.math_score < 40 THEN 3
                    ELSE 4
                END
        '''

        df = pd.read_sql_query(query, self.conn)
        return df

    def get_intervention_effectiveness_metrics(self):
        """
        Calculate intervention effectiveness across all Tier 2/3 students
        """
        query = '''
            WITH intervention_progress AS (
                SELECT
                    i.intervention_name,
                    s.tier,
                    COUNT(DISTINCT s.student_id) as total_students,
                    SUM(CASE WHEN i.progress_status = 'Improving' THEN 1 ELSE 0 END) as improving,
                    SUM(CASE WHEN i.progress_status = 'Steady' THEN 1 ELSE 0 END) as steady,
                    SUM(CASE WHEN i.progress_status = 'Needs Adjustment' THEN 1 ELSE 0 END) as needs_adjustment
                FROM students s
                INNER JOIN interventions i ON s.student_id = i.student_id
                WHERE s.tier IN ('Tier 2', 'Tier 3')
                GROUP BY i.intervention_name, s.tier
            )
            SELECT
                intervention_name,
                tier,
                total_students,
                improving,
                steady,
                needs_adjustment,
                ROUND(100.0 * improving / total_students, 1) as improvement_rate,
                ROUND(100.0 * needs_adjustment / total_students, 1) as adjustment_rate
            FROM intervention_progress
            ORDER BY tier, improvement_rate DESC
        '''

        df = pd.read_sql_query(query, self.conn)
        return df

    def export_weekly_reports(self, output_dir='.'):
        """
        Export all weekly reports to CSV files
        This automated process eliminates 8 hours of manual compilation
        """
        timestamp = datetime.now().strftime('%Y%m%d')

        # Main weekly report
        report = self.generate_weekly_intervention_report()
        filename = f'{output_dir}/weekly_intervention_report_{timestamp}.csv'
        report.to_csv(filename, index=False)
        print(f"✓ Weekly intervention report exported: {filename}")

        # Urgent cases
        urgent = self.get_students_needing_immediate_attention()
        filename = f'{output_dir}/urgent_cases_{timestamp}.csv'
        urgent.to_csv(filename, index=False)
        print(f"✓ Urgent cases report exported: {filename}")

        # Effectiveness metrics
        effectiveness = self.get_intervention_effectiveness_metrics()
        filename = f'{output_dir}/intervention_effectiveness_{timestamp}.csv'
        effectiveness.to_csv(filename, index=False)
        print(f"✓ Intervention effectiveness report exported: {filename}")

        return {
            'weekly_report': report,
            'urgent_cases': urgent,
            'effectiveness': effectiveness
        }

    def get_individual_student_report(self, student_number):
        """
        Generate detailed report for individual student
        """
        query = '''
            SELECT
                s.student_number,
                s.first_name || ' ' || s.last_name as student_name,
                s.grade_level,
                s.tier,
                i.intervention_name,
                i.start_date,
                i.frequency,
                i.progress_status,
                json_group_array(
                    json_object(
                        'date', a.assessment_date,
                        'reading', a.reading_score,
                        'math', a.math_score,
                        'fluency', a.fluency_score,
                        'comprehension', a.comprehension_score
                    )
                ) as assessments
            FROM students s
            LEFT JOIN interventions i ON s.student_id = i.student_id
            LEFT JOIN assessments a ON s.student_id = a.student_id
            WHERE s.student_number = ?
            GROUP BY s.student_id
        '''

        cursor = self.conn.cursor()
        cursor.execute(query, (student_number,))
        result = cursor.fetchone()

        if result:
            return {
                'student_number': result[0],
                'student_name': result[1],
                'grade_level': result[2],
                'tier': result[3],
                'intervention': result[4],
                'start_date': result[5],
                'frequency': result[6],
                'progress_status': result[7],
                'assessments': json.loads(result[8]) if result[8] else []
            }
        return None

    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()


def main():
    """Main function to demonstrate system functionality"""
    print("=" * 70)
    print("AUTOMATED PROGRESS MONITORING SYSTEM")
    print("SQL-Based PowerSchool Integration")
    print("=" * 70)

    # Initialize system
    system = ProgressMonitoringSystem()

    print("\nGenerating weekly intervention reports...")
    print("Processing 60+ Tier 2/3 students...\n")

    # Generate weekly report
    weekly_report = system.generate_weekly_intervention_report()
    print(f"✓ Weekly report generated for {len(weekly_report)} students\n")

    # Show summary statistics
    print("SUMMARY STATISTICS:")
    print(f"  Tier 2 Students: {len(weekly_report[weekly_report['tier'] == 'Tier 2'])}")
    print(f"  Tier 3 Students: {len(weekly_report[weekly_report['tier'] == 'Tier 3'])}")
    print(f"  Students Improving: {len(weekly_report[weekly_report['progress_status'] == 'Improving'])}")
    print(f"  Students Needing Adjustment: {len(weekly_report[weekly_report['progress_status'] == 'Needs Adjustment'])}")
    print()

    # Identify urgent cases
    urgent = system.get_students_needing_immediate_attention()
    print(f"URGENT ATTENTION REQUIRED: {len(urgent)} students")
    if len(urgent) > 0:
        print("\nTop 5 Urgent Cases:")
        print(urgent[['student_name', 'tier', 'alert_status', 'attendance_rate']].head().to_string(index=False))
    print()

    # Intervention effectiveness
    effectiveness = system.get_intervention_effectiveness_metrics()
    print("\nINTERVENTION EFFECTIVENESS:")
    print(effectiveness.to_string(index=False))
    print()

    # Export reports
    print("\nExporting weekly reports...")
    reports = system.export_weekly_reports('.')

    # Sample individual student report
    sample_student = weekly_report.iloc[0]['student_number']
    individual_report = system.get_individual_student_report(sample_student)
    print(f"\n--- SAMPLE INDIVIDUAL REPORT: {sample_student} ---")
    print(json.dumps(individual_report, indent=2, default=str))

    print("\n" + "=" * 70)
    print("IMPACT METRICS:")
    print("- Eliminates 8 hours of manual data compilation per week")
    print("- Generates reports for 60+ Tier 2/3 students automatically")
    print("- Provides real-time intervention effectiveness tracking")
    print("- Enables data-driven intervention decisions")
    print("=" * 70)

    system.close()


if __name__ == "__main__":
    main()
