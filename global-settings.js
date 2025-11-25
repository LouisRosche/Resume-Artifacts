/**
 * Global Settings Manager
 * Provides consistent theme management across all pages (main site and demos)
 * Auto-initializes from localStorage and injects accessibility controls when needed
 *
 * Works alongside script.js on main page, and standalone on demo pages
 */

(function() {
    'use strict';

    // Apply theme immediately on script load (before DOM ready) to prevent flash
    function applyThemeFromStorage() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        const colorblindMode = localStorage.getItem('colorblindMode') === 'true';

        const html = document.documentElement;
        html.removeAttribute('data-theme');

        if (darkMode && colorblindMode) {
            html.setAttribute('data-theme', 'colorblind-dark');
        } else if (darkMode) {
            html.setAttribute('data-theme', 'dark');
        } else if (colorblindMode) {
            html.setAttribute('data-theme', 'colorblind');
        }
    }

    // Apply theme immediately
    applyThemeFromStorage();

    // Wait for DOM to be ready for interactive features
    document.addEventListener('DOMContentLoaded', function() {
        initGlobalSettings();
    });

    function initGlobalSettings() {
        // Check if accessibility toggle already exists (e.g., on main index.html)
        let accessibilityToggle = document.querySelector('.accessibility-toggle');

        // Check if script.js has already initialized (it sets this data attribute)
        const isMainPageWithScript = document.querySelector('script[src="script.js"]') ||
                                      document.querySelector('script[src="./script.js"]');

        if (!accessibilityToggle) {
            // Inject the accessibility toggle HTML for demo pages
            accessibilityToggle = createAccessibilityToggle();
            document.body.appendChild(accessibilityToggle);
            // Setup handlers since we created the toggle
            setupAccessibilityToggle();
        } else if (!isMainPageWithScript) {
            // Toggle exists but script.js isn't present (shouldn't happen, but handle it)
            setupAccessibilityToggle();
        }
        // If isMainPageWithScript is true, let script.js handle the toggle events

        // Always sync checkbox state with localStorage (in case page has the HTML but checkboxes aren't synced)
        syncCheckboxState();

        // Initialize chart theme support
        initChartThemeSupport();
    }

    function syncCheckboxState() {
        const darkModeCheckbox = document.getElementById('dark-mode-toggle');
        const colorblindModeCheckbox = document.getElementById('colorblind-mode-toggle');

        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedColorblindMode = localStorage.getItem('colorblindMode') === 'true';

        if (darkModeCheckbox && !darkModeCheckbox.hasAttribute('data-synced')) {
            darkModeCheckbox.checked = savedDarkMode;
            darkModeCheckbox.setAttribute('data-synced', 'true');
        }
        if (colorblindModeCheckbox && !colorblindModeCheckbox.hasAttribute('data-synced')) {
            colorblindModeCheckbox.checked = savedColorblindMode;
            colorblindModeCheckbox.setAttribute('data-synced', 'true');
        }
    }

    function createAccessibilityToggle() {
        const container = document.createElement('div');
        container.className = 'accessibility-toggle';
        container.innerHTML = `
            <button class="accessibility-toggle-button" aria-label="Accessibility settings"
                    aria-expanded="false" aria-controls="accessibility-panel">
                <span aria-hidden="true">&#9881;</span>
            </button>
            <div class="accessibility-panel" id="accessibility-panel" role="region" aria-label="Accessibility settings">
                <h3>Display Settings</h3>
                <div class="accessibility-option">
                    <label>
                        <input type="checkbox" id="dark-mode-toggle" aria-describedby="dark-mode-info">
                        <span>Dark Mode</span>
                    </label>
                    <p class="accessibility-info" id="dark-mode-info">Reduces eye strain in low light</p>
                </div>
                <div class="accessibility-option">
                    <label>
                        <input type="checkbox" id="colorblind-mode-toggle" aria-describedby="colorblind-mode-info">
                        <span>Colorblind-Safe Palette</span>
                    </label>
                    <p class="accessibility-info" id="colorblind-mode-info">Optimized for color vision deficiency</p>
                </div>
            </div>
        `;
        return container;
    }

    function setupAccessibilityToggle() {
        const toggleButton = document.querySelector('.accessibility-toggle-button');
        const panel = document.getElementById('accessibility-panel');
        const darkModeCheckbox = document.getElementById('dark-mode-toggle');
        const colorblindModeCheckbox = document.getElementById('colorblind-mode-toggle');

        if (!toggleButton || !panel) return;

        // Mark as initialized to prevent double initialization
        if (toggleButton.hasAttribute('data-initialized')) return;
        toggleButton.setAttribute('data-initialized', 'true');

        // Load saved preferences from localStorage and sync checkboxes
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedColorblindMode = localStorage.getItem('colorblindMode') === 'true';

        if (darkModeCheckbox) {
            darkModeCheckbox.checked = savedDarkMode;
        }
        if (colorblindModeCheckbox) {
            colorblindModeCheckbox.checked = savedColorblindMode;
        }

        // Toggle panel visibility
        toggleButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = panel.classList.toggle('active');
            toggleButton.setAttribute('aria-expanded', isExpanded);
        });

        // Close panel when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.accessibility-toggle')) {
                panel.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Dark mode toggle
        if (darkModeCheckbox) {
            darkModeCheckbox.addEventListener('change', function() {
                localStorage.setItem('darkMode', this.checked);
                applyTheme();
            });
        }

        // Colorblind mode toggle
        if (colorblindModeCheckbox) {
            colorblindModeCheckbox.addEventListener('change', function() {
                localStorage.setItem('colorblindMode', this.checked);
                applyTheme();
            });
        }

        // Keyboard navigation - close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && panel.classList.contains('active')) {
                panel.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.focus();
            }
        });
    }

    function applyTheme() {
        const darkModeCheckbox = document.getElementById('dark-mode-toggle');
        const colorblindModeCheckbox = document.getElementById('colorblind-mode-toggle');

        const darkMode = darkModeCheckbox?.checked || false;
        const colorblindMode = colorblindModeCheckbox?.checked || false;

        const html = document.documentElement;
        html.removeAttribute('data-theme');

        if (darkMode && colorblindMode) {
            html.setAttribute('data-theme', 'colorblind-dark');
        } else if (darkMode) {
            html.setAttribute('data-theme', 'dark');
        } else if (colorblindMode) {
            html.setAttribute('data-theme', 'colorblind');
        }

        // Dispatch custom event for any components that need to react to theme changes
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { darkMode, colorblindMode }
        }));

        // Update Chart.js charts if present
        updateChartThemes(darkMode);
    }

    /**
     * Chart.js Theme Support
     * Provides theme-aware colors for charts and updates them on theme change
     */
    function initChartThemeSupport() {
        // Listen for theme changes to update charts
        document.addEventListener('themeChanged', function(e) {
            updateChartThemes(e.detail.darkMode);
        });
    }

    function getChartColors(isDarkMode) {
        // Define theme-aware color palettes
        if (isDarkMode) {
            return {
                // Primary chart colors (brighter for dark mode)
                primary: '#60a5fa',      // Lighter blue
                secondary: '#34d399',     // Lighter green
                accent: '#c4b5fd',        // Lighter purple
                warning: '#fbbf24',       // Bright yellow
                danger: '#f87171',        // Lighter red

                // For pie/doughnut charts
                tier1: '#34d399',         // Green (success)
                tier2: '#fbbf24',         // Yellow (warning)
                tier3: '#f87171',         // Red (danger)

                // Grid and text
                gridColor: 'rgba(148, 163, 184, 0.2)',
                textColor: '#e2e8f0',

                // Backgrounds with transparency
                primaryBg: 'rgba(96, 165, 250, 0.2)',
                secondaryBg: 'rgba(52, 211, 153, 0.2)',
                accentBg: 'rgba(196, 181, 253, 0.2)',
                warningBg: 'rgba(251, 191, 36, 0.2)',
                dangerBg: 'rgba(248, 113, 113, 0.2)'
            };
        } else {
            return {
                // Primary chart colors (standard for light mode)
                primary: '#2563eb',
                secondary: '#10b981',
                accent: '#8b5cf6',
                warning: '#f59e0b',
                danger: '#ef4444',

                // For pie/doughnut charts
                tier1: '#10b981',
                tier2: '#f59e0b',
                tier3: '#ef4444',

                // Grid and text
                gridColor: 'rgba(0, 0, 0, 0.1)',
                textColor: '#334155',

                // Backgrounds with transparency
                primaryBg: 'rgba(37, 99, 235, 0.1)',
                secondaryBg: 'rgba(16, 185, 129, 0.1)',
                accentBg: 'rgba(139, 92, 246, 0.1)',
                warningBg: 'rgba(245, 158, 11, 0.1)',
                dangerBg: 'rgba(239, 68, 68, 0.1)'
            };
        }
    }

    function updateChartThemes(isDarkMode) {
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') return;

        const colors = getChartColors(isDarkMode);

        // Update Chart.js global defaults
        Chart.defaults.color = colors.textColor;
        Chart.defaults.borderColor = colors.gridColor;

        // Update all existing chart instances
        Object.values(Chart.instances || {}).forEach(chart => {
            if (!chart) return;

            // Update scales
            if (chart.options.scales) {
                Object.values(chart.options.scales).forEach(scale => {
                    if (scale.grid) {
                        scale.grid.color = colors.gridColor;
                    }
                    if (scale.ticks) {
                        scale.ticks.color = colors.textColor;
                    }
                });
            }

            // Update legend
            if (chart.options.plugins?.legend?.labels) {
                chart.options.plugins.legend.labels.color = colors.textColor;
            }

            // Update title
            if (chart.options.plugins?.title) {
                chart.options.plugins.title.color = colors.textColor;
            }

            // Trigger chart update
            chart.update('none');
        });
    }

    // Expose functions globally for other scripts to use
    window.GlobalSettings = {
        applyTheme: applyTheme,
        applyThemeFromStorage: applyThemeFromStorage,
        getChartColors: getChartColors,
        updateChartThemes: updateChartThemes
    };
})();
