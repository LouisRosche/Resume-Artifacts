/**
 * Global Settings Manager
 * Provides consistent theme management across all pages (main site and demos)
 * Auto-initializes from localStorage and injects accessibility controls when needed
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
        // Check if accessibility toggle already exists
        let accessibilityToggle = document.querySelector('.accessibility-toggle');

        if (!accessibilityToggle) {
            // Inject the accessibility toggle HTML
            accessibilityToggle = createAccessibilityToggle();
            document.body.appendChild(accessibilityToggle);
        }

        // Initialize toggle functionality
        setupAccessibilityToggle();
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
    }

    // Expose functions globally for other scripts to use
    window.GlobalSettings = {
        applyTheme: applyTheme,
        applyThemeFromStorage: applyThemeFromStorage
    };
})();
