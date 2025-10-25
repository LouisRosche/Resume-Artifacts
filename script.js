/**
 * Louis Rosche - Portfolio JavaScript
 * Accessible tab component and project filtering with ARIA support
 */

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Set focus to target for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
});

/**
 * Tab component with full ARIA support
 * Implements WCAG 2.1 AA accessible tabs pattern
 */
function showTab(tabName) {
    // Get all tab panels and buttons
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    const tabButtons = document.querySelectorAll('[role="tab"]');

    // Hide all tab panels
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
    });

    // Deselect all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('tabindex', '-1');
    });

    // Show selected tab panel
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
        selectedPanel.setAttribute('aria-hidden', 'false');
    }

    // Activate selected tab button
    const selectedButton = document.getElementById(`${tabName}-tab`);
    if (selectedButton) {
        selectedButton.classList.add('active');
        selectedButton.setAttribute('aria-selected', 'true');
        selectedButton.setAttribute('tabindex', '0');
        selectedButton.focus();
    }
}

/**
 * Keyboard navigation for tabs
 * Arrow keys to navigate between tabs
 */
function initTabKeyboardNavigation() {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

    tabList.addEventListener('keydown', (e) => {
        const currentTab = document.activeElement;
        const currentIndex = tabs.indexOf(currentTab);

        let nextIndex;

        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                nextIndex = (currentIndex + 1) % tabs.length;
                tabs[nextIndex].click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                tabs[nextIndex].click();
                break;
            case 'Home':
                e.preventDefault();
                tabs[0].click();
                break;
            case 'End':
                e.preventDefault();
                tabs[tabs.length - 1].click();
                break;
        }
    });
}

/**
 * Project filtering system
 * Filters projects by category with smooth transitions
 */
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });

    const activeButton = document.querySelector(`[data-filter="${category}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }

    // Filter projects
    let visibleCount = 0;
    projects.forEach(project => {
        const categories = project.dataset.category.split(' ');

        if (category === 'all' || categories.includes(category)) {
            project.classList.remove('hidden');
            project.setAttribute('aria-hidden', 'false');
            visibleCount++;
        } else {
            project.classList.add('hidden');
            project.setAttribute('aria-hidden', 'true');
        }
    });

    // Announce results to screen readers
    announceToScreenReader(`Showing ${visibleCount} project${visibleCount !== 1 ? 's' : ''}`);
}

/**
 * Announce messages to screen readers using ARIA live regions
 */
function announceToScreenReader(message) {
    let liveRegion = document.getElementById('aria-live-region');

    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
}

/**
 * Initialize all interactive components on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab keyboard navigation
    initTabKeyboardNavigation();

    // Set initial tab state
    const firstTab = document.querySelector('[role="tab"][aria-selected="true"]');
    if (firstTab) {
        firstTab.setAttribute('tabindex', '0');
    }

    // Add screen-reader-only class for accessibility announcements
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Add focus trap prevention for modals (if any added later)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals/dialogs
            const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
            openModals.forEach(modal => {
                modal.setAttribute('aria-hidden', 'true');
                modal.classList.remove('active');
            });
        }
    });
});

/**
 * Lazy load images when they come into viewport
 * (Placeholder for future image optimization)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Scroll-spy functionality for sidebar navigation
 * Highlights active section as user scrolls
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const progressBar = document.getElementById('reading-progress');

    if (sections.length === 0 || sidebarLinks.length === 0) return;

    // Debounce scroll events for performance
    let scrollTimeout;

    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;

        // Update reading progress
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / documentHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }

        // Find current section - check if at bottom first
        let currentSection = '';
        const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10;

        if (atBottom && sections.length > 0) {
            // If at bottom of page, activate last section
            currentSection = sections[sections.length - 1].getAttribute('id');
        } else {
            // Otherwise find section based on scroll position
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop - 200) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        // Update active link
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section');

            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Handle scroll with debouncing
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateActiveSection);
    }, { passive: true });

    // Initial call
    updateActiveSection();
}

/**
 * Initialize sidebar smooth scrolling
 * Enhanced smooth scroll for sidebar links with offset
 */
function initSidebarScrolling() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20; // Small offset from top

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active state immediately for better UX
                sidebarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Initialize scroll-spy and sidebar scrolling on load
document.addEventListener('DOMContentLoaded', function() {
    initScrollSpy();
    initSidebarScrolling();
});

// Export functions for use in inline handlers (temporary until full migration)
window.showTab = showTab;
window.filterProjects = filterProjects;
