
/* =========================================================
   Auth — Firebase Authentication + Role-Based Access Control
   ========================================================= */

const Auth = {
  currentUser: null,
  userProfile: null,

  init() {
    if (!window.auth) {
      console.error('Firebase Auth not available');
      return;
    }
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        await this.loadUserProfile(user.uid);
        this.updateUI();
        this.enforceRouteAccess();
      } else {
        this.currentUser = null;
        this.userProfile = null;
        this.clearUI();
        this.enforceRouteAccess();
      }
    });
  },

  async loadUserProfile(uid) {
    try {
      const profile = await API.getUserProfile(uid);
      this.userProfile = profile;
      if (!profile) {
        // Create basic profile if missing
        await API.createUserProfile(uid, {
          name: this.currentUser.displayName || 'User',
          email: this.currentUser.email,
          role: 'student'
        });
        this.userProfile = await API.getUserProfile(uid);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  },

  async login(email, password) {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  },

  async register(name, email, password, role) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const user = cred.user;
    await user.updateProfile({ displayName: name });
    await API.createUserProfile(user.uid, {
      name,
      email,
      role: role || 'student'
    });
    return user;
  },

  async logout() {
    await auth.signOut();
    sessionStorage.clear();
    localStorage.removeItem('nexira_user');
    window.location.href = 'login.html';
  },

  getRole() {
    return this.userProfile?.role || 'guest';
  },

  isAuthenticated() {
    return !!this.currentUser;
  },

  // Role-based route protection
  enforceRouteAccess() {
    const allowedMeta = document.querySelector('meta[name="allowed-roles"]');
    const allowedRoles = allowedMeta ? allowedMeta.getAttribute('content').split(',').map(s => s.trim()).filter(Boolean) : [];
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const role = this.getRole();

    // Public pages (no allowed-roles or empty)
    if (allowedRoles.length === 0) {
      // If logged-in user visits login/register, redirect to dashboard
      if (this.isAuthenticated() && ['login.html','register.html'].includes(currentPath)) {
        this.redirectToDashboard();
      }
      return;
    }

    // Protected pages
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return;
    }

    if (!allowedRoles.includes(role)) {
      window.location.href = '403.html';
      return;
    }
  },

  redirectToDashboard() {
    const role = this.getRole();
    const paths = {
      admin: 'admin-dashboard.html',
      instructor: 'instructor-dashboard.html',
      student: 'student-dashboard.html'
    };
    window.location.href = paths[role] || 'student-dashboard.html';
  },

  updateUI() {
    const name = this.userProfile?.name || this.currentUser?.displayName || 'User';
    const role = this.getRole();
    const initials = Utils.getInitials(name);
    const email = this.currentUser?.email || '';

    // Header elements
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    const initialsEl = document.getElementById('user-initials');
    const dropName = document.getElementById('dropdown-user-name');
    const dropEmail = document.getElementById('dropdown-user-email');

    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = role;
    if (initialsEl) initialsEl.textContent = initials;
    if (dropName) dropName.textContent = name;
    if (dropEmail) dropEmail.textContent = email;

    // Update sidebar active state
    const currentPage = window.location.pathname.split('/').pop().replace('.html','');
    document.querySelectorAll('.sidebar__nav-link').forEach(link => {
      link.classList.remove('sidebar__nav-link--active');
      if (link.dataset.page === currentPage) {
        link.classList.add('sidebar__nav-link--active');
      }
    });

    // Hide/show nav links based on role (if nav has data-role)
    document.querySelectorAll('[data-role]').forEach(el => {
      const roles = el.dataset.role.split(',');
      el.style.display = roles.includes(role) ? '' : 'none';
    });
  },

  clearUI() {
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');
    const initialsEl = document.getElementById('user-initials');
    if (nameEl) nameEl.textContent = 'Guest';
    if (roleEl) roleEl.textContent = '—';
    if (initialsEl) initialsEl.textContent = '?';
  }
};

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Auth.init();
});
