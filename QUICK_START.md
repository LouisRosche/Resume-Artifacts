# Quick Start Guide

Get up and running with the portfolio artifacts in under 10 minutes.

## For Recruiters (2 minutes)

**Want the highlights?**

1. Open `index.html` in your browser
2. Click "Recruiter (30 sec)" tab
3. See key metrics and download resume

**Key takeaways:**
- 95%+ ML model accuracy
- 65% improvement in crisis response
- 500+ students served
- Full-stack: Python, SQL, JavaScript

---

## For Hiring Managers (5 minutes)

**Want to see the impact?**

1. Open `index.html` → "Hiring Manager" tab
2. Read one case study:
   - [Predictive Model Case Study](docs/case-studies/predictive-model-case-study.md)
   - See how 48-hour response became 8 hours
3. Check [Impact Metrics](docs/IMPACT_METRICS.md)

**Questions to ask yourself:**
- Can I deliver measurable results? ✅
- Do I understand both tech and domain? ✅
- Can I work at scale? ✅ (15,000+ users)

---

## For Technical Leads (10 minutes)

**Want to see the code?**

### Run a Demo

```bash
# Clone repository
git clone https://github.com/LouisRosche/Resume-Artifacts.git
cd Resume-Artifacts

# Install dependencies
pip install -r requirements.txt

# Run MTSS Dashboard
cd mtss-dashboard
python mtss_dashboard.py

# Run Predictive Model
cd ../predictive-model
python student_risk_predictor.py

# Run ETL Pipeline
cd ../etl-pipeline
python nonprofit_data_pipeline.py
```

### Review Architecture

1. [System Integration](docs/architecture/system-integration.md)
2. Code structure in each artifact folder
3. Check out `predictive-model/` for ML implementation

**Tech stack:**
- Python: pandas, scikit-learn, XGBoost, Plotly
- SQL: PostgreSQL, SQLAlchemy
- JavaScript: Vanilla JS, Google Apps Script
- Cloud: Azure, GCP

---

## For Education Leaders (5 minutes)

**Want to see student impact?**

1. Read [Foster Care Case Study](docs/case-studies/foster-care-equity.md)
   - 52% → 82% transition success (+30%)
   - See how systematic tracking changed outcomes

2. Open `index.html` → "Education Leader" tab
   - Behavioral incidents: -52%
   - Academic engagement: +38%
   - SEL competency: +41%

3. Review [Impact Metrics](docs/IMPACT_METRICS.md)

---

## Interactive Demos

### 1. Restorative Justice Platform

```bash
# Open in browser
open restorative-justice-platform/index.html
```

Features to try:
- Browse circle types
- View protocols
- Check participation metrics

### 2. MTSS Dashboard (Python)

```bash
cd mtss-dashboard
python mtss_dashboard.py
```

Generated files:
- `mtss_tier_distribution.html` - Student tiers
- `mtss_student_progress.html` - Individual tracking
- `mtss_complete_dashboard.html` - Full dashboard

### 3. Predictive Model

```bash
cd predictive-model
python student_risk_predictor.py
```

Watch it:
- Train ML model (95%+ accuracy)
- Generate predictions
- Create intervention alerts
- Save trained model

---

## Explore by Interest

### "Show me the data science"
→ [Predictive Model](predictive-model/)
- XGBoost implementation
- 14 feature engineering
- 95%+ accuracy achieved
- [Read case study](docs/case-studies/predictive-model-case-study.md)

### "Show me the system architecture"
→ [System Integration](docs/architecture/system-integration.md)
- Data flow diagrams
- ETL pipeline design
- Integration points
- Scalability planning

### "Show me the impact"
→ [Impact Metrics](docs/IMPACT_METRICS.md)
- 40 hours weekly saved
- 65% faster response
- 30% better outcomes
- $520k+ 5-year value

### "Show me the equity focus"
→ [Foster Care Case Study](docs/case-studies/foster-care-equity.md)
- 8 tracked metrics
- 30% transition improvement
- Systematic support
- Real student stories

### "Show me the ETL pipeline"
→ [ETL Pipeline](etl-pipeline/)
- 45 orgs integrated
- 5 data sources
- 85% time reduction
- Data quality improved 22%

---

## Project Highlights

### Most Impressive Technical Achievement
**Predictive Model** ([predictive-model/](predictive-model/))
- 95%+ accuracy with 14 features
- 2-3 week early warning
- Production deployment

### Biggest Real-World Impact
**Foster Care Equity** ([equity-tracking/](equity-tracking/))
- 52% → 82% transition success
- 60+ vulnerable students
- Systematic support protocol

### Best System Architecture
**ETL Pipeline** ([etl-pipeline/](etl-pipeline/))
- 15,000+ children served
- 5 disparate systems integrated
- 71% → 93% data reliability

### Most Time Saved
**Progress Monitoring** ([progress-monitoring/](progress-monitoring/))
- 8 hours → 0 hours weekly
- 100% automation
- 60+ students tracked

---

## FAQ

### "Is this real data?"
No - all code uses simulated data for privacy. But:
- Algorithms are production-quality
- Metrics are from real implementations
- Architecture is battle-tested

### "Can I run this locally?"
Yes! All Python code runs locally with:
```bash
pip install -r requirements.txt
python [artifact]/[main_file].py
```

### "What if I want to dive deeper?"
Each artifact has:
- Its own README
- Commented code
- Architecture docs
- Case studies (where applicable)

### "How do I contact Louis?"
- Email: louis.rosche@gmail.com
- Phone: 573-259-6165
- LinkedIn: [linkedin.com/in/louis-rosche](https://linkedin.com/in/louis-rosche)

---

## Next Steps

### For Interviews

**Technical Interview Prep:**
1. Review [System Integration](docs/architecture/system-integration.md)
2. Run demos for hands-on understanding
3. Check code in `predictive-model/` and `etl-pipeline/`

**Behavioral Interview Prep:**
1. Read both case studies
2. Review [Impact Metrics](docs/IMPACT_METRICS.md)
3. Note the before/after comparisons

### For Deep Dives

**Week 1:** Core Systems
- MTSS Dashboard
- Progress Monitoring
- Assessment Platform

**Week 2:** Advanced ML
- Predictive Model
- Feature engineering
- Model deployment

**Week 3:** Data Integration
- ETL Pipeline
- Data quality
- Multi-source aggregation

**Week 4:** Automation & UX
- Workflow Automation
- Restorative Justice Platform
- User experience focus

---

## Visual Tour

### Open These in Order:

1. **`index.html`** - Start here for visual portfolio
2. **Case Study** - Read one for context
3. **Run Demo** - See actual output
4. **Architecture Doc** - Understand integration
5. **Code** - Review implementation

**Total time: 30 minutes for comprehensive understanding**

---

## Portfolio Structure

```
Resume-Artifacts/
├── index.html                          # ← START HERE (Visual portfolio)
│
├── docs/
│   ├── IMPACT_METRICS.md              # ← Overall impact summary
│   ├── case-studies/                  # ← Real-world stories
│   │   ├── predictive-model-case-study.md
│   │   └── foster-care-equity.md
│   └── architecture/                  # ← Technical details
│       └── system-integration.md
│
├── predictive-model/                  # ML: 95%+ accuracy
├── mtss-dashboard/                    # Real-time tracking
├── etl-pipeline/                      # Data integration
├── equity-tracking/                   # Foster care support
├── progress-monitoring/               # Automated reporting
├── assessment-platform/               # Multi-source aggregation
├── workflow-automation/               # Google Apps Script
└── restorative-justice-platform/     # Web platform

Each folder has:
├── README.md          # Project overview
├── [main_script].py   # Runnable code
└── [other files]      # Supporting code
```

---

## Get the Most Value

**30 seconds?**
→ Open `index.html`, click "Recruiter" tab

**5 minutes?**
→ Read one case study

**15 minutes?**
→ Run 3 demos, see actual output

**1 hour?**
→ Full portfolio review + architecture understanding

**Want to talk?**
→ louis.rosche@gmail.com

---

**Remember:** These aren't just portfolio pieces - they're production systems I built that improved outcomes for 500+ students and saved 40+ hours weekly.

**The code is the proof. The metrics are the impact. The stories are my mission.**
