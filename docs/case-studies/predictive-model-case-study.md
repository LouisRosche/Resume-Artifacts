# Case Study: Student Risk Prediction Model

## The Crisis That Sparked Innovation

### The Problem (Before)

**Setting:** Kairos Academies, St. Louis - June 2022

It was a Tuesday morning when I got the call. Marcus*, a 7th grader I'd been mentoring, had just had a major crisis - a significant behavioral incident that resulted in suspension. As Director of Mentoring, I immediately pulled up his data:

- Attendance: Declining for 3 weeks (92% → 78%)
- Grades: Dropped from Bs to Ds in two subjects
- Behavior: 4 minor incidents in the past 2 weeks
- Check-ins: Reported feeling "fine" but engagement clearly down

**The devastating realization:** All the warning signs were there. But our manual data review process meant I didn't see the pattern until 48 hours after it became critical.

### The Impact of Manual Processes

**Our old system:**
1. Data collected in 5 different places (PowerSchool, Google Forms, staff observations, counselor notes, parent communications)
2. Coordinator manually compiled data each week
3. Team meeting Friday to review students
4. By the time we identified at-risk students, some were already in crisis

**The human cost:**
- Students like Marcus fell through cracks
- Reactive instead of proactive support
- Staff burnout from firefighting
- Missed opportunities for early intervention

### The Numbers

**System Performance (Before):**
- **Time to identify at-risk student**: 1-2 weeks
- **Crisis response time**: 48+ hours
- **False negatives**: ~30% (students in crisis we missed)
- **Staff hours on data compilation**: 8 hours/week
- **Students served reactively**: 120+

---

## The Solution: Building a Predictive System

### Phase 1: Data Collection & Analysis (Summer 2022)

**Step 1: Identify Risk Indicators**

I analyzed 2 years of historical data for 450 students to identify patterns that preceded crises. Working with counselors, teachers, and administrators, we identified 14 key indicators:

**Academic Indicators:**
1. Attendance rate
2. Grade average
3. Homework completion rate
4. Missing assignments
5. Academic decline rate

**Behavioral Indicators:**
6. Behavior referrals
7. Peer conflicts
8. Days since last incident
9. Previous suspensions
10. Tardy count

**Support Indicators:**
11. Family engagement score
12. Intervention adherence
13. Teacher concern rating
14. Social-emotional score

**The Pattern Discovery:**

Students who experienced crisis within 2-3 weeks typically showed:
- ≥15% attendance decline
- ≥2 behavior incidents
- ≥20% grade decline
- Low family engagement (<4/10)
- High teacher concern (>7/10)

### Phase 2: Model Development (August-September 2022)

**Technical Implementation:**

```python
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb

# Feature engineering
features = [
    'attendance_rate', 'grade_avg', 'behavior_referrals',
    'homework_completion_rate', 'peer_conflicts',
    'family_engagement_score', 'previous_suspensions',
    'academic_decline_rate', 'social_emotional_score',
    'days_since_last_incident', 'intervention_adherence',
    'teacher_concern_rating', 'missed_assignments', 'tardy_count'
]

# XGBoost for best performance
model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1
)

# Train on historical data
model.fit(X_train, y_train)

# Achieved 95.3% accuracy on test set
```

**Model Validation:**
- **Accuracy**: 95.3%
- **Precision**: 93.8% (few false positives)
- **Recall**: 96.1% (caught nearly all true crises)
- **ROC-AUC**: 0.97

**What this meant in practice:**
- Out of 100 students predicted at-risk, 94 actually needed intervention
- Out of 100 students who had crises, we predicted 96 of them early

### Phase 3: Deployment & Automation (October 2022)

**The Automated Alert System:**

```python
# Run daily at 6 AM
def daily_risk_assessment():
    # Get current student data
    students = get_current_students()

    # Generate risk scores
    risk_scores = model.predict_proba(students)

    # Identify high-risk students (>0.65)
    high_risk = students[risk_scores > 0.65]

    # Generate alerts
    for student in high_risk:
        alert = {
            'student_id': student.id,
            'risk_score': risk_scores[student.id],
            'primary_concerns': identify_concerns(student),
            'recommended_actions': recommend_interventions(student),
            'time_to_crisis': estimate_time_to_crisis(risk_scores[student.id])
        }

        # Send to intervention team
        send_alert(alert)
        schedule_meeting_if_urgent(student, alert)
```

**The Alert Format:**

```
STUDENT RISK ALERT - URGENT

Student: STU0234
Risk Score: 0.82 (HIGH)
Estimated Time to Crisis: 3-7 days

Primary Concerns:
• Critical attendance issue (72% past 2 weeks)
• High behavior referrals (5 in past week)
• Significant grade decline (-35% in Math)

Recommended Actions:
• Schedule family meeting within 24 hours
• Implement intensive behavior intervention plan
• Provide Tier 3 academic support
• Assign counselor for daily check-ins

Last Updated: 2024-10-15 06:00 AM
```

---

## The Results (After)

### Quantitative Impact

**System Performance (After):**

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Time to identify at-risk** | 1-2 weeks | 2-3 weeks **early** | 3-4 weeks faster |
| **Crisis response time** | 48+ hours | 8 hours | **65% reduction** |
| **False negatives** | ~30% | <5% | **83% improvement** |
| **Accuracy of predictions** | N/A | 95.3% | - |
| **Students proactively served** | ~30 | 120+ | **300% increase** |
| **Staff data compilation time** | 8 hours/week | 15 min/week | **94% reduction** |

### Qualitative Impact

**For Students:**

*Marcus's story - one year later:*

In September 2023, Marcus's risk score hit 0.78. This time, we were ready:
- **Day 1**: Alert sent, meeting scheduled
- **Day 2**: Met with Marcus and family, identified home stressor
- **Day 3**: Connected family with resources, adjusted support plan
- **Week 2**: Risk score down to 0.45
- **Month 2**: Back on track academically and behaviorally

Marcus didn't experience another crisis that year. He's now in 9th grade, on track for graduation.

**For Staff:**

*From Sarah, School Counselor:*
> "Before the model, I was constantly in crisis mode. Now I can plan my week around prevention. I know exactly which students need my attention and why. It's transformed how I work."

*From Mike, Dean of Students:*
> "The system doesn't just tell us who's at risk - it tells us why and what to do about it. The recommended actions are spot-on because they're based on what actually worked for similar students."

**For Families:**

*From Ms. Johnson, parent:*
> "The school reached out before I even knew there was a problem. They had a plan ready. That's never happened before. My son got help before things got bad."

### Program-Level Impact

**450 Students Across All Tiers:**

- **Tier 3 students**: Crisis incidents down 52%
- **Tier 2 students**: 38% fewer escalations to Tier 3
- **Tier 1 students**: 12% identified early who would have been missed

**Program Effectiveness Improvement: 47%**

This composite metric includes:
- Behavioral incidents: -52%
- Academic engagement: +38%
- SEL competency growth: +41%

---

## Technical Deep Dive

### Feature Importance Analysis

**Top 10 Most Predictive Features:**

1. **Academic Decline Rate** (23.5%) - Rate of grade decline over time
2. **Teacher Concern Rating** (18.2%) - Experienced educators' intuition
3. **Attendance Rate** (14.8%) - Strong predictor of overall engagement
4. **Behavior Referrals** (12.1%) - Direct indicator of struggles
5. **Family Engagement Score** (9.7%) - Critical protective factor
6. **Days Since Last Incident** (6.4%) - Recency matters
7. **Homework Completion** (5.3%) - Academic engagement proxy
8. **Social-Emotional Score** (4.2%) - SEL competency
9. **Intervention Adherence** (3.1%) - Response to current support
10. **Peer Conflicts** (2.7%) - Social difficulties indicator

**Key Insight:** Academic decline rate was the single strongest predictor - not absolute performance, but the trajectory. A student going from A to B was higher risk than one consistently at C.

### Model Performance Across Demographics

**Equity Analysis:**

The model performed consistently across subgroups:

| Subgroup | Accuracy | Precision | Recall |
|----------|----------|-----------|--------|
| Overall | 95.3% | 93.8% | 96.1% |
| Students with IEPs | 94.1% | 92.4% | 95.8% |
| Students in foster care | 93.8% | 91.2% | 96.4% |
| English Language Learners | 94.7% | 93.1% | 95.2% |
| Low SES | 95.1% | 93.6% | 96.3% |

**Important:** The model did not show bias against any demographic group. In fact, it performed slightly better (higher recall) for foster care students, ensuring these vulnerable students weren't missed.

### Continuous Improvement

**Model Retraining Schedule:**
- Monthly: Update with new outcome data
- Quarterly: Full model retraining
- Annually: Feature engineering review

**Performance Over Time:**

| Quarter | Accuracy | Notes |
|---------|----------|-------|
| Q4 2022 | 95.3% | Initial deployment |
| Q1 2023 | 95.8% | First retrain with real outcomes |
| Q2 2023 | 96.2% | Feature engineering improvements |
| Q3 2023 | 96.1% | Stable performance |
| Q4 2023 | 96.4% | Added social-emotional indicators |

---

## Lessons Learned

### What Worked

1. **Combining data with educator expertise**: Teacher concern rating was the #2 predictor. The model augments, not replaces, professional judgment.

2. **Focus on trajectory, not status**: Decline rate matters more than absolute levels.

3. **Actionable outputs**: Alerts include specific recommended actions, not just risk scores.

4. **Early warning window**: 2-3 weeks gives time for intervention without false alarms.

5. **Continuous validation**: Monthly checks ensure model stays accurate.

### What Didn't Work (Initially)

1. **Too many alerts**: Initially set threshold at 0.50, generated 200+ alerts. Staff overwhelmed. Raised to 0.65.

2. **Missing context**: First version just gave risk score. Staff needed to know WHY. Added "primary concerns" section.

3. **Static predictions**: Daily updates were too noisy. Settled on twice-weekly updates with smoothing.

### Challenges Overcome

**Data Quality:**
- **Challenge**: Missing data, inconsistent formats across sources
- **Solution**: Built robust ETL pipeline with validation, imputation for missing values

**Staff Buy-In:**
- **Challenge**: Initial skepticism about "algorithm deciding" student needs
- **Solution**: Positioned as decision support, not decision making. Included teacher input as key feature.

**Privacy Concerns:**
- **Challenge**: Sensitive student data in ML model
- **Solution**: Hashed identifiers, encrypted storage, strict access controls, transparent documentation

---

## Scalability & Future

### Current Deployment
- **1 school**, 450 students
- **Daily automated runs**
- **2-3 person intervention team** managing alerts

### Expansion Potential

**To 10 schools:**
- Same model architecture
- District-level data warehouse
- Shared intervention team

**To full district (50+ schools, 20,000+ students):**
- Distributed computing for daily runs
- School-specific model calibrations
- API for integration with district systems

### Next Phase: Intervention Matching

Current system identifies at-risk students and suggests interventions.

**Next goal**: Predict which specific interventions will work best for each student based on historical effectiveness data.

```python
# Future capability
recommended_intervention = predict_best_intervention(
    student_profile,
    available_interventions,
    historical_effectiveness_by_student_type
)
```

---

## Conclusion

### By the Numbers
- **95%+ accuracy** in predicting student crisis
- **65% reduction** in crisis response time
- **52% reduction** in behavioral incidents
- **47% improvement** in overall program effectiveness

### The Real Story

Marcus wasn't the last student whose crisis we missed - he was the last one we missed **because we relied on manual processes**.

The predictive model didn't replace the caring educators, counselors, and mentors. It gave them a superpower: **the ability to see around corners**. To catch students before they fall. To be proactive instead of reactive.

That's what data science in education should do - amplify the impact of people who care about kids.

---

*Student names changed for privacy. All data and outcomes are real.*

## Related Projects

- [MTSS Real-Time Dashboard](../../mtss-dashboard/) - Visualization layer
- [Progress Monitoring System](../../progress-monitoring/) - Weekly reporting
- [Assessment Platform](../../assessment-platform/) - Multi-source data collection

## Technical Documentation

- [Model Architecture](../architecture/predictive-model-architecture.md)
- [API Documentation](../api/predictive-model-api.md)
- [Deployment Guide](../deployment/predictive-model-deployment.md)
