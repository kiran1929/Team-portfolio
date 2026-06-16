/**
 * theme.js — Dark / Light Mode Toggle with localStorage Persistence
 * Loaded as a standard script (no ES module syntax)
 */

var ThemeManager = (function () {
  var STORAGE_KEY = 'theme';
  var DARK  = 'dark';
  var LIGHT = 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.setAttribute('aria-label', 'Switch to ' + (theme === DARK ? 'light' : 'dark') + ' mode');
    });
  }

  function toggle() {
    var current = document.documentElement.getAttribute('data-theme') || DARK;
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    applyTheme(saved === LIGHT ? LIGHT : DARK);

    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', toggle);
    });
  }

  return { init: init, applyTheme: applyTheme, toggle: toggle };
})();
