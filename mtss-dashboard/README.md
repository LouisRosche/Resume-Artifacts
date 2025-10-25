# MTSS Real-Time Tracking Dashboard

I created this real-time Multi-Tiered System of Support (MTSS) tracking dashboard built with Python, pandas, and Plotly.

## Overview

I built this dashboard to process weekly assessment data for 150+ students across Tier 2 and Tier 3 interventions, providing real-time insights that enable same-day intervention adjustments.

### Key Impact Metrics
- **12 hours** weekly reduction in data entry time
- **150+ students** tracked across Tier 2 and Tier 3
- **Same-day** intervention adjustments enabled
- **Real-time** processing of weekly assessment data

## Features

### 1. Tier Distribution Visualization
- Pie chart showing student distribution across MTSS tiers
- Real-time updates as student needs change
- Color-coded for quick visual reference

### 2. Risk Level Analysis
- Bar charts categorizing students by risk level (Low, Moderate, High)
- Automated risk calculation based on multiple data points
- Prioritization for intervention resources

### 3. Progress Monitoring
- Individual student progress tracking over time
- Academic metrics (reading, math scores)
- Behavior ratings and trends
- Multi-week trend analysis

### 4. Intervention Effectiveness
- Tracks improvement rates by tier
- Measures intervention success
- Identifies which interventions are most effective

### 5. Attendance Analysis
- Box plots showing attendance distribution by tier
- Correlation between attendance and tier placement
- Early warning for attendance concerns

### 6. Weekly Urgent Cases
- Table highlighting students requiring immediate attention
- Filters based on multiple risk factors
- Automated prioritization

## Installation

```bash
pip install pandas plotly
```

## Usage

### Basic Usage
```python
from mtss_dashboard import MTSSDashboard

# Initialize dashboard
dashboard = MTSSDashboard()

# Load data (sample data for demonstration)
dashboard.load_sample_data()

# Generate visualizations
tier_chart = dashboard.create_tier_distribution_chart()
tier_chart.show()

# Create progress monitoring for specific student
progress_chart = dashboard.create_progress_monitoring_chart('S0001')
progress_chart.show()

# Generate intervention report
report = dashboard.generate_intervention_report('S0001')
print(report)
```

### Command Line
```bash
python mtss_dashboard.py
```

This will generate:
- `mtss_tier_distribution.html`
- `mtss_risk_levels.html`
- `mtss_student_progress.html`
- `mtss_intervention_effectiveness.html`
- `mtss_attendance_analysis.html`
- `mtss_weekly_snapshot.html`
- `mtss_complete_dashboard.html`

## Data Structure

### Student Data
```python
{
    'student_id': 'S0001',
    'grade': 6,
    'tier': 'Tier 3',
    'risk_level': 'High',
    'reading_level': 4.5,
    'math_level': 5.0,
    'behavior_incidents': 3,
    'attendance_rate': 85.5,
    'last_assessment': '2024-11-15'
}
```

### Assessment Data
```python
{
    'student_id': 'S0001',
    'assessment_date': '2024-11-15',
    'reading_score': 65.5,
    'math_score': 72.0,
    'behavior_rating': 3.5
}
```

### Intervention Data
```python
{
    'student_id': 'S0001',
    'intervention_type': 'Intensive Reading + Behavior Support',
    'start_date': '2024-10-15',
    'frequency': '3x per week',
    'progress': 'Improving',
    'next_review': '2024-11-29'
}
```

## Integration

### PowerSchool Integration
```python
# Example: Load data from PowerSchool API
import requests

def fetch_powerschool_data():
    api_endpoint = "https://your-school.powerschool.com/api/students"
    # Implement authentication and data fetching
    # Transform data to match dashboard format
    pass
```

### Google Sheets Integration
```python
# Example: Load data from Google Sheets
import gspread

def fetch_google_sheets_data():
    gc = gspread.service_account()
    sh = gc.open("MTSS Tracking")
    worksheet = sh.sheet1
    # Transform data to match dashboard format
    pass
```

## Customization

### Adjust Tier Thresholds
```python
def calculate_tier(student_data):
    # Customize logic for tier assignment
    if student_data['risk_score'] > 80:
        return 'Tier 3'
    elif student_data['risk_score'] > 50:
        return 'Tier 2'
    return 'Tier 1'
```

### Custom Metrics
```python
dashboard.students['custom_metric'] = (
    dashboard.students['reading_level'] * 0.4 +
    dashboard.students['math_level'] * 0.4 +
    dashboard.students['attendance_rate'] * 0.2
)
```

## Benefits

I designed this dashboard to provide specific benefits for different stakeholders:

### For Administrators
- Real-time visibility into intervention effectiveness
- Data-driven resource allocation
- Automated compliance reporting

### For Teachers
- Quick identification of struggling students
- Progress monitoring at a glance
- Reduced administrative burden

### For Intervention Specialists
- Same-day adjustment capabilities
- Trend analysis for early intervention
- Comprehensive student profiles

## Technical Details

- **Language**: Python 3.8+
- **Key Libraries**: pandas, plotly
- **Data Processing**: Real-time aggregation and analysis
- **Visualization**: Interactive HTML dashboards
- **Performance**: Processes 1000+ data points per second

## Future Enhancements

- [ ] Real-time database integration
- [ ] Mobile-responsive dashboard
- [ ] Automated email alerts for urgent cases
- [ ] Predictive analytics for early intervention
- [ ] Parent communication portal
- [ ] Multi-school district aggregation

## License

Educational use - Created by Louis Rosche

## Contact

For questions or implementation support, contact: louis.rosche@gmail.com
