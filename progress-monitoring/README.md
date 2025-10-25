# Automated Progress Monitoring System

I developed this SQL-based system for PowerSchool database integration that generates weekly intervention reports for 60+ Tier 2/3 students automatically.

## Overview

I built this system to eliminate 8 hours of manual data compilation per week by using automated SQL queries on the PowerSchool database to generate comprehensive intervention reports.

## Key Features

- **Automated SQL Queries**: Complex queries extract student data from PowerSchool
- **Weekly Report Generation**: Automatically generates reports every week
- **60+ Students Tracked**: Monitors all Tier 2/3 students automatically
- **Data Quality Validation**: Built-in data validation and quality checks
- **Individual Student Reports**: Detailed reports for each student

## Impact Metrics

- **Time Savings**: 8 hours → 0 hours weekly (100% automation)
- **Students Covered**: 60+ Tier 2/3 students
- **Report Frequency**: Weekly (every Monday morning)
- **Data Completeness**: 95%+ (automated validation)

## Installation

```bash
pip install pandas sqlalchemy sqlite3
```

## Usage

### Run the Progress Monitoring System

```python
from progress_monitoring_system import ProgressMonitoringSystem

# Initialize system with database connection
system = ProgressMonitoringSystem('powerschool_demo.db')

# Generate weekly intervention report
weekly_report = system.generate_weekly_intervention_report()

# Identify students needing immediate attention
urgent = system.get_students_needing_immediate_attention()

# Get intervention effectiveness metrics
effectiveness = system.get_intervention_effectiveness_metrics()

# Export all reports to CSV
system.export_weekly_reports(output_dir='reports')
```

### Command Line

```bash
python progress_monitoring_system.py
```

This generates:
- Weekly intervention report (all 60+ students)
- Urgent cases report (students needing immediate attention)
- Intervention effectiveness metrics
- All exported as CSV files

## SQL Query Examples

### Weekly Intervention Report

```sql
WITH latest_assessments AS (
    SELECT student_id, MAX(assessment_date) as latest_date
    FROM assessments
    WHERE assessment_date >= date('now', '-7 days')
    GROUP BY student_id
),
current_scores AS (
    SELECT a.student_id, a.reading_score, a.math_score
    FROM assessments a
    INNER JOIN latest_assessments la
        ON a.student_id = la.student_id
        AND a.assessment_date = la.latest_date
)
SELECT
    s.student_id,
    s.name,
    s.tier,
    cs.reading_score,
    cs.math_score,
    i.progress_status
FROM students s
LEFT JOIN current_scores cs ON s.student_id = cs.student_id
LEFT JOIN interventions i ON s.student_id = i.student_id
WHERE s.tier IN ('Tier 2', 'Tier 3')
ORDER BY s.tier, s.name
```

## Database Structure

I designed this system to work with a PowerSchool-like database with these tables:

- **students**: Student demographics and tier information
- **assessments**: Weekly assessment scores (reading, math, behavior)
- **interventions**: Current intervention assignments and progress
- **attendance**: Daily attendance records
- **behavior**: Behavioral incident tracking

## Report Outputs

See [Sample Outputs Documentation](../docs/SAMPLE_OUTPUTS.md) for examples of generated reports.

### Weekly Intervention Report

Includes for each Tier 2/3 student:
- Current tier and risk level
- Latest assessment scores
- Week-over-week progress
- Attendance rate
- Behavior incidents
- Intervention status
- Recommended actions

### Urgent Cases Report

Identifies students requiring immediate attention based on:
- Attendance < 85%
- High-severity behavior incidents
- Reading/Math scores < 40%
- Multiple risk factors present

### Intervention Effectiveness

Tracks effectiveness of interventions by:
- Tier (Tier 2 vs Tier 3)
- Intervention type
- Student progress (Improving, Steady, Needs Adjustment)
- Percentage showing improvement

## Integration with PowerSchool

### API Connection

```python
# For production use with real PowerSchool API
import requests

POWERSCHOOL_URL = "https://your-school.powerschool.com/ws/v1"
ACCESS_TOKEN = "your_access_token"

def fetch_powerschool_students():
    response = requests.get(
        f"{POWERSCHOOL_URL}/students",
        headers={"Authorization": f"Bearer {ACCESS_TOKEN}"}
    )
    return response.json()
```

### Database Connection

```python
# Direct database connection (requires VPN/secure access)
from sqlalchemy import create_engine

engine = create_engine(
    'postgresql://user:password@powerschool-db.school.org/powerschool'
)
```

## Customization

### Add Custom Metrics

```python
# Add custom SQL query for new metric
def get_custom_metric(self, student_id):
    query = """
        SELECT custom_field
        FROM custom_table
        WHERE student_id = ?
    """
    result = pd.read_sql_query(query, self.conn, params=(student_id,))
    return result
```

### Modify Report Format

```python
# Customize report columns
export_df = weekly_report[[
    'student_id',
    'name',
    'tier',
    'your_custom_column',
    'reading_score',
    'math_score'
]]
```

## Benefits

I designed this system to provide specific benefits for different stakeholders:

### For Administrators
- Weekly snapshots of all Tier 2/3 students
- Data-driven intervention decisions
- Automated compliance documentation

### For Intervention Coordinators
- No more manual data compilation (8 hours saved)
- Consistent reporting format
- Easy identification of urgent cases
- Track intervention effectiveness

### For Teachers
- Clear picture of student progress
- Weekly updates automatically generated
- Focus on teaching, not data entry

## Technical Details

- **Language**: Python 3.8+
- **Database**: SQLite (demo), PostgreSQL (production)
- **Key Libraries**: pandas, SQLAlchemy
- **Performance**: Processes 60+ students in < 5 minutes

## Future Enhancements

- [ ] Real-time dashboard instead of weekly reports
- [ ] Mobile app for on-the-go access
- [ ] Email alerts for urgent cases
- [ ] Integration with more SIS platforms
- [ ] Predictive analytics for early warning

## Related Projects

- [MTSS Dashboard](../mtss-dashboard/) - Real-time visualization
- [Predictive Model](../predictive-model/) - Early warning system
- [Assessment Platform](../assessment-platform/) - Multi-source data collection

## Contact

For questions or implementation support: louis.rosche@gmail.com
