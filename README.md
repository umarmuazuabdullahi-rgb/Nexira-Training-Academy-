# Nexira Training Academy

A world-class, enterprise-grade online learning platform built with modern web technologies.

## 🚀 Features

### Landing Page
- Hero section with animated statistics
- Course catalog with filtering
- Pricing plans with toggle
- Testimonials slider
- FAQ accordion
- Team showcase
- Contact form
- Newsletter subscription

### Authentication
- Email/password registration & login
- Google OAuth sign-in
- Phone authentication
- Password reset
- Email verification
- Role-based access control

### Student Dashboard
- Course progress tracking
- Assignment management
- Quiz & exam system
- Certificate gallery
- Calendar & scheduling
- Messaging system
- Download center
- Wallet & payments

### Instructor Dashboard
- Course builder
- Lesson management
- Video upload
- Assignment grading
- Quiz builder
- Live class hosting
- Student analytics
- Earnings tracking

### Admin Dashboard
- Analytics & reporting
- User management
- Course approval
- Payment monitoring
- Certificate generation
- Activity logs
- Security center
- Backup & restore

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES2024) |
| Styling | CSS Custom Properties, Glassmorphism |
| Backend | Firebase (Auth, Firestore, Storage, FCM) |
| Future | Node.js, Express, PostgreSQL, Prisma |

## 📁 Project Structure

```
nexira-training-academy/
├── index.html                  # Landing page
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker
│   └── assets/
│       ├── icons/              # PWA icons
│       ├── images/             # Static images
│       └── fonts/              # Custom fonts
├── src/
│   ├── css/
│   │   ├── variables.css       # Design tokens
│   │   ├── base.css            # Reset & utilities
│   │   ├── components.css      # UI components
│   │   ├── landing.css         # Landing styles
│   │   ├── auth.css            # Auth pages styles
│   │   ├── dashboard.css       # Dashboard styles
│   │   ├── responsive.css      # Media queries
│   │   └── dark-mode.css       # Theme overrides
│   └── js/
│       ├── core/
│       │   ├── app.js          # Main application
│       │   ├── auth.js         # Auth service
│       │   ├── theme.js        # Theme manager
│       │   ├── notifications.js # Notification service
│       │   └── storage.js      # Storage service
│       └── modules/
│           ├── landing.js      # Landing page logic
│           ├── auth-pages.js   # Auth page logic
│           └── dashboard.js    # Dashboard logic
├── pages/
│   ├── auth/                   # Login, Register, etc.
│   ├── dashboard/
│   │   ├── student/            # Student dashboard
│   │   ├── instructor/         # Instructor dashboard
│   │   └── admin/              # Admin dashboard
│   └── courses/                # Course pages
├── firebase/
│   └── config.js               # Firebase config & rules
└── docs/                        # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase CLI (optional)
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/nexira-training-academy.git
cd nexira-training-academy
```

2. Serve locally:
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

3. Open http://localhost:8080

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password, Google, Phone)
3. Create a Cloud Firestore database
4. Set up Firebase Storage
5. Replace credentials in `firebase/config.js`

```javascript
export const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## 🔐 Security

- HTTPS enforced
- Input validation on all forms
- XSS protection via content sanitization
- CSRF tokens for state-changing operations
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- Audit logging for sensitive operations

## 🎨 Design System

### Colors
- Primary: `#0a1628` (Deep Navy)
- Accent: `#c9a227` (Gold)
- Success: `#10b981`
- Warning: `#f59e0b`
- Danger: `#ef4444`

### Typography
- Primary: Inter
- Display: Playfair Display

### Spacing
- Base unit: 4px
- Scale: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📦 Deployment

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- Email: support@nexira.academy
- Documentation: [docs.nexira.academy](https://docs.nexira.academy)
- Community Forum: [community.nexira.academy](https://community.nexira.academy)

---

Built with ❤️ by the Nexira Team
