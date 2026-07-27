
/* =========================================================
   App — UI Logic, Dropdowns, Sidebar, Components
   ========================================================= */

const App = {
  init() {
    this.initDropdowns();
    this.initSidebar();
    this.initNotifications();
    this.initRevealAnimations();
  },

  initDropdowns() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-dropdown]');
      if (toggle) {
        e.preventDefault();
        const target = document.querySelector(toggle.dataset.dropdown);
        if (target) {
          const isHidden = target.classList.contains('hidden');
          // Close all dropdowns
          document.querySelectorAll('[data-dropdown]').forEach(t => {
            const el = document.querySelector(t.dataset.dropdown);
            if (el) el.classList.add('hidden');
            t.setAttribute('aria-expanded', 'false');
          });
          if (isHidden) {
            target.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
          }
        }
      } else if (!e.target.closest('.hidden') && !e.target.closest('[id^="user-menu"]') && !e.target.closest('[id^="notifications-panel"]')) {
        document.querySelectorAll('#user-menu, #notifications-panel').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[data-dropdown]').forEach(t => t.setAttribute('aria-expanded', 'false'));
      }
    });
  },

  initSidebar() {
    const toggle = document.querySelector('[data-toggle="sidebar"]');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('is-open');
      });
    }
  },

  initNotifications() {
    window.markAllRead = function() {
      const badge = document.getElementById('notification-badge');
      const list = document.getElementById('notifications-list');
      if (badge) {
        badge.hidden = true;
        badge.textContent = '0';
      }
      if (list) {
        list.innerHTML = '<div style="padding:24px;text-align:center;color:var(--color-text-muted);font-size:14px;"><p>All notifications marked as read</p></div>';
      }
    };
  },

  initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      revealElements.forEach(el => observer.observe(el));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
