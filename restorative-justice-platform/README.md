# Restorative Justice Circle Platform

GitHub-hosted platform for facilitating restorative justice Circle discussions with 30+ staff members, tracking 120+ sessions annually.

## Overview

This web-based platform provides a complete system for managing restorative justice circles in educational settings, including scheduling, protocol documentation, and participation tracking.

## Features

- **Circle Management**: Schedule and track restorative circles
- **Protocol Library**: Comprehensive protocols for different circle types
- **Participation Metrics**: Track attendance and engagement across 120+ annual sessions
- **Staff Training**: Resources for 30+ facilitators

## Circle Types

1. **Community Building Circles**: Build trust and relationships
2. **Conflict Resolution Circles**: Address conflicts constructively
3. **Harm and Repair Circles**: Process harm and work toward healing
4. **Decision-Making Circles**: Collaborative group decisions

## Quick Start

1. Open `index.html` in a web browser
2. Navigate between sections using the main navigation
3. View and create circles
4. Access protocol documentation
5. Track participation metrics

## Usage

### Creating a New Circle

```javascript
// From the Active Circles section, click "+ New Circle"
// Fill in circle details:
// - Title
// - Date and time
// - Facilitator
// - Participants
```

### Accessing Protocols

All circle protocols are available in the `protocols/` directory as Markdown files:

- `community-building.md`
- `conflict-resolution.md`
- `harm-repair.md`
- `decision-making.md`

### Tracking Participation

The platform automatically tracks:
- Total sessions (120+ annually)
- Active participants (30+ staff)
- Average attendance
- Resolution rates

## File Structure

```
restorative-justice-platform/
├── index.html           # Main platform interface
├── styles.css          # Styling
├── app.js              # Application logic
├── protocols/          # Circle protocol documentation
│   ├── community-building.md
│   ├── conflict-resolution.md
│   ├── harm-repair.md
│   └── decision-making.md
└── README.md
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Markdown for protocol documentation

## Impact Metrics

- **30+ staff members** using platform
- **120+ sessions** facilitated annually
- **Standardized dialogue protocols** across organization
- **Streamlined scheduling** and documentation

## Customization

### Adding New Circle Types

1. Create new protocol in `protocols/` directory
2. Add protocol reference in `app.js`:

```javascript
const protocols = [
    {
        title: "Your New Circle Type",
        file: "protocols/new-circle-type.md",
        description: "Description here"
    }
];
```

### Modifying Circle Data

Edit the `circles` array in `app.js`:

```javascript
circles.push({
    id: 4,
    title: "New Circle",
    date: "2024-12-01",
    facilitator: "Your Name",
    participants: 10,
    status: "scheduled",
    type: "community-building"
});
```

## Best Practices

1. **Pre-Circle Preparation**: Review appropriate protocol beforehand
2. **Circle Setup**: Arrange seating in a complete circle
3. **Time Management**: Allocate sufficient time (45-90 minutes)
4. **Follow-Up**: Document outcomes and schedule follow-ups as needed

## Future Enhancements

- [ ] User authentication
- [ ] Database integration for persistent storage
- [ ] Email notifications for scheduled circles
- [ ] Mobile-responsive design
- [ ] Attendance tracking integration
- [ ] Outcome reporting dashboard

## Contact

For questions or support: louis.rosche@gmail.com
