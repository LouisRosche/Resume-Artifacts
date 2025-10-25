// Restorative Justice Circle Platform - Main Application
// Tracks 120+ sessions annually with 30+ staff participants

// Sample data structure for circles
let circles = [
    {
        id: 1,
        title: "Community Building - Grade 6",
        date: "2024-11-15",
        time: "10:00 AM",
        facilitator: "Sarah Johnson",
        participants: 12,
        status: "scheduled",
        type: "community-building",
        notes: "Focus on team building and trust development"
    },
    {
        id: 2,
        title: "Conflict Resolution - Student Support",
        date: "2024-11-10",
        time: "2:00 PM",
        facilitator: "Michael Chen",
        participants: 8,
        status: "completed",
        type: "conflict-resolution",
        notes: "Successfully resolved peer conflict situation"
    },
    {
        id: 3,
        title: "Staff Circle - Monthly Check-in",
        date: "2024-11-20",
        time: "3:30 PM",
        facilitator: "Louis Rosche",
        participants: 15,
        status: "scheduled",
        type: "community-building",
        notes: "Staff wellness and collaboration focus"
    }
];

// Participation metrics data
let metrics = {
    totalSessions: 120,
    activeParticipants: 30,
    avgAttendance: 12.5,
    resolutionRate: 87,
    monthlyData: [
        { month: "Aug", sessions: 8, participants: 25 },
        { month: "Sep", sessions: 12, participants: 28 },
        { month: "Oct", sessions: 15, participants: 30 },
        { month: "Nov", sessions: 10, participants: 30 }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    loadCircles();
    loadProtocols();
    loadMetrics();
});

// Navigation between sections
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show target section
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Load and display circles
function loadCircles() {
    const circlesGrid = document.getElementById('circles-grid');
    circlesGrid.innerHTML = '';

    circles.forEach(circle => {
        const circleCard = createCircleCard(circle);
        circlesGrid.appendChild(circleCard);
    });

    // Setup search functionality
    document.getElementById('circle-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCircles = circles.filter(circle =>
            circle.title.toLowerCase().includes(searchTerm) ||
            circle.facilitator.toLowerCase().includes(searchTerm) ||
            circle.type.toLowerCase().includes(searchTerm)
        );

        circlesGrid.innerHTML = '';
        filteredCircles.forEach(circle => {
            const circleCard = createCircleCard(circle);
            circlesGrid.appendChild(circleCard);
        });
    });
}

// Create a circle card element
function createCircleCard(circle) {
    const card = document.createElement('div');
    card.className = 'circle-card';

    const statusClass = `status-${circle.status}`;
    const statusText = circle.status.charAt(0).toUpperCase() + circle.status.slice(1);

    card.innerHTML = `
        <h3>${circle.title}</h3>
        <span class="circle-status ${statusClass}">${statusText}</span>
        <div class="circle-meta">
            <span>📅 ${formatDate(circle.date)}</span>
            <span>🕐 ${circle.time}</span>
        </div>
        <div class="circle-meta">
            <span>👤 ${circle.facilitator}</span>
            <span>👥 ${circle.participants} participants</span>
        </div>
        <p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">
            ${circle.notes}
        </p>
    `;

    card.addEventListener('click', () => openCircleDetails(circle));

    return card;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Open circle details (placeholder for future expansion)
function openCircleDetails(circle) {
    alert(`Circle Details:\n\nTitle: ${circle.title}\nFacilitator: ${circle.facilitator}\nDate: ${formatDate(circle.date)}\nTime: ${circle.time}\nParticipants: ${circle.participants}\n\nNotes: ${circle.notes}`);
}

// Create new circle (placeholder)
function createNewCircle() {
    const title = prompt("Enter circle title:");
    if (!title) return;

    const newCircle = {
        id: circles.length + 1,
        title: title,
        date: new Date().toISOString().split('T')[0],
        time: "TBD",
        facilitator: "TBD",
        participants: 0,
        status: "scheduled",
        type: "community-building",
        notes: "New circle - details to be added"
    };

    circles.push(newCircle);
    loadCircles();
}

// Load circle protocols from markdown files
async function loadProtocols() {
    const protocolsList = document.getElementById('protocols-list');

    const protocols = [
        {
            title: "Community Building Circle",
            file: "protocols/community-building.md",
            description: "Build trust and strengthen relationships within the community"
        },
        {
            title: "Conflict Resolution Circle",
            file: "protocols/conflict-resolution.md",
            description: "Address conflicts and disagreements in a structured, supportive environment"
        },
        {
            title: "Harm and Repair Circle",
            file: "protocols/harm-repair.md",
            description: "Address harm, take accountability, and work toward healing"
        },
        {
            title: "Decision-Making Circle",
            file: "protocols/decision-making.md",
            description: "Make collaborative decisions with full group participation"
        }
    ];

    protocols.forEach(protocol => {
        const protocolCard = document.createElement('div');
        protocolCard.className = 'protocol-card';
        protocolCard.innerHTML = `
            <h3>${protocol.title}</h3>
            <p>${protocol.description}</p>
            <a href="${protocol.file}" style="color: var(--primary-color); text-decoration: none;">
                View Protocol →
            </a>
        `;
        protocolsList.appendChild(protocolCard);
    });
}

// Load and display metrics
function loadMetrics() {
    document.getElementById('total-sessions').textContent = `${metrics.totalSessions}+`;
    document.getElementById('active-participants').textContent = `${metrics.activeParticipants}+`;
    document.getElementById('avg-attendance').textContent = metrics.avgAttendance.toFixed(1);
    document.getElementById('resolution-rate').textContent = `${metrics.resolutionRate}%`;
}

// Export participation data for reporting
function exportParticipationData() {
    const data = {
        exportDate: new Date().toISOString(),
        summary: metrics,
        circles: circles,
        totalParticipation: circles.reduce((sum, circle) => sum + circle.participants, 0)
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `circle-participation-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Track participation for a specific session
function trackParticipation(circleId, participantList) {
    const circle = circles.find(c => c.id === circleId);
    if (circle) {
        circle.participants = participantList.length;
        circle.participantList = participantList;
        circle.lastUpdated = new Date().toISOString();

        // Update metrics
        updateMetrics();
    }
}

// Update overall metrics
function updateMetrics() {
    metrics.totalSessions = circles.filter(c => c.status === 'completed').length;
    metrics.avgAttendance = circles.reduce((sum, c) => sum + c.participants, 0) / circles.length;

    loadMetrics();
}
