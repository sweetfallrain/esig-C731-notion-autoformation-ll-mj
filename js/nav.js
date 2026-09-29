(function () {
  'use strict';

  function normalizePath(pathname) {
    var segments = pathname.split('/').filter(Boolean);
    var last = segments[segments.length - 1] || 'index.html';
    return last;
  }

  function markActiveLink() {
    var currentPage = normalizePath(window.location.pathname);
    var links = document.querySelectorAll('[data-nav-link]');

    links.forEach(function (link) {
      var linkPage = normalizePath(new URL(link.href, window.location.href).pathname);
      if (linkPage === currentPage) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function setupMobileMenu() {
    var toggle = document.querySelector('.site-nav__toggle');
    var panel = document.querySelector('.site-nav__mobile');
    var closeBtn = document.querySelector('.site-nav__close');

    if (!toggle || !panel || !closeBtn) {
      return;
    }

    function getFocusable() {
      return Array.prototype.slice.call(
        panel.querySelectorAll('a[href], button:not([disabled])')
      );
    }

    function openMenu() {
      panel.hidden = false;
      panel.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    }

    function closeMenu() {
      panel.classList.remove('is-open');
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
      document.removeEventListener('keydown', onKeydown);
    }

    function onKeydown(event) {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      var focusable = getFocusable();
      if (focusable.length === 0) {
        return;
      }

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    toggle.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveLink();
    setupMobileMenu();
  });
})();
