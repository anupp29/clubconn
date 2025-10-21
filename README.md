# ClubConn - Your Campus Connection Hub 🎓

<div align="center">

![ClubConn Logo](public/clubconn-logo.png)

**Connecting KKWIEER's Ecosystem - One Platform for All Clubs, Events, and Communities**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3-orange?logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://clubconn.vercel.app) · [Report Bug](https://github.com/anupp29/clubconn/issues) · [Request Feature](https://github.com/anupp29/clubconn/issues)

</div>

---

## 📋 Table of Contents

- [About ClubConn](#-about-clubconn)
- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)
- [Roadmap](#%EF%B8%8F-roadmap)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About ClubConn

ClubConn is a comprehensive platform designed to connect students with all clubs, events, and communities at KKWIEER in one centralized hub. Whether you're looking to discover new clubs, attend exciting events, track your achievements, or build your campus network, ClubConn is your one-stop destination.

### Why ClubConn?

- **🎯 Centralized Hub**: All clubs, events, and communities in one place
- **🔍 Easy Discovery**: Find clubs and events that match your interests
- **📈 Track Progress**: Monitor your achievements, certificates, and participation
- **🤝 Community Building**: Connect with like-minded students and grow together
- **⚙️ Admin Tools**: Powerful dashboards for club admins and college administrators

---

## ✨ Features

### 🏠 Landing Page
- Modern, responsive hero section with animated grid background
- Featured clubs showcase with color-coded cards
- Upcoming events calendar with real-time updates
- Live statistics and social proof
- Interactive "How it works" section
- Comprehensive footer with all navigation links

### 🎪 Events Management
- Browse all upcoming and past events with advanced filtering
- Filter by category, date, club, and community
- Detailed event pages with RSVP functionality
- Volunteer registration and management system
- Event proposal submission and sponsorship management
- Automated event reports with digital certificates
- Event check-in system with QR codes

### 🏛️ Clubs Directory
- Comprehensive list of all campus clubs with search
- Color-coded club cards with smooth hover effects
- Detailed club pages featuring:
  - Mission and vision statements
  - Committee members showcase with roles
  - Past events gallery with achievements
  - Upcoming events timeline
  - Quick navigation menu for easy access
  - Member statistics and engagement metrics

### 🌐 Communities
- Six major communities: Tech, Cultural, Business, Sports, Creative, Social
- Community-specific event listings and calendars
- Member statistics and engagement analytics
- Community-specific color themes and branding
- Community leaderboards and achievements

### 👤 User Profiles
- Clean username-based URLs (`/u/username`)
- Public profiles with customizable privacy controls
- Comprehensive profile information management
- Social media integration (LinkedIn, GitHub, Twitter, Website)
- Achievements and accomplishments showcase
- Club memberships display with roles
- Activity feed showing recent participation
- Profile editing with real-time validation and username availability checking

### 🏆 Achievements System
- Badge collection and progress tracking
- Multiple badge categories:
  - 🎯 Participation badges (event attendance, volunteer work)
  - 👑 Leadership badges (club roles, event organizing)
  - 💡 Skill badges (technical, creative, communication)
  - ⭐ Special recognition badges (MVP, innovator)
- Progress indicators for locked badges with requirements
- Achievement showcase on user profiles
- Gamification elements to boost engagement

### 📜 Certificates
- Automated digital certificate generation
- Blockchain-inspired certificate verification system
- Download certificates as high-quality PDFs
- Share certificates on social media platforms
- Certificate gallery with filtering and search
- QR code verification for authenticity
- Certificate templates for different event types

### 📊 Dashboard
- Personalized activity feed with recent updates
- Quick stats overview (events attended, clubs joined, certificates earned)
- Upcoming events recommendations based on interests
- Recent activity timeline with engagement metrics
- AI-powered event recommendations
- Quick access to all platform features
- Customizable dashboard widgets

### 🏅 Leaderboard
- Campus-wide ranking system with points
- Top 3 podium display with special recognition
- Points-based ranking algorithm
- Filter by timeframe (all-time, monthly, weekly)
- User statistics and achievement badges
- Category-wise leaderboards (participation, leadership, skills)

### 🔐 Authentication
- Secure email/password authentication
- Google OAuth 2.0 integration
- GitHub OAuth integration
- Real-time username availability checking
- Secure profile ownership validation
- Username setup flow for OAuth users
- Password reset and email verification
- Session management and security

### 👨‍💼 Admin Dashboards

#### Club Admin Dashboard
- **Event Management**: Create, edit, and delete club events
- **Member Management**: Add/remove members, assign roles
- **Volunteer Tracking**: Monitor volunteer hours and contributions
- **Proposal Review**: Review and approve event proposals
- **Sponsorship Management**: Track sponsors and partnerships
- **Analytics Dashboard**: View club performance metrics
- **Certificate Generation**: Issue certificates to participants
- **Announcement System**: Send notifications to members

#### College Admin Dashboard
- **Platform Statistics**: Monitor platform-wide activity
- **User Management**: Manage student accounts and permissions
- **Club Oversight**: Approve new clubs and monitor activity
- **Event Approval**: Review and approve club events
- **Report Generation**: Generate analytics and activity reports
- **Activity Monitoring**: Track engagement across communities
- **System Configuration**: Manage platform settings and features

### 💼 Sponsorship Portal
- Browse available sponsorship opportunities
- Submit sponsorship proposals with detailed information
- Track sponsorship status and approval workflow
- Sponsor dashboard with analytics and ROI tracking
- Sponsorship packages and pricing tiers
- Automated sponsor recognition on event pages

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)

### Backend & Services
- **Authentication**: [Firebase Auth](https://firebase.google.com/products/auth)
- **Database**: [Cloud Firestore](https://firebase.google.com/products/firestore)
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Hosting**: [Vercel](https://vercel.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier, TypeScript
- **Version Control**: Git & GitHub
- **CI/CD**: Vercel (automatic deployments)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Firebase Account** ([Sign up](https://firebase.google.com/))

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/anupp29/clubconn.git
cd clubconn
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up Firebase

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication providers (Email/Password, Google, GitHub)
- Set up Firestore database with proper collections
- Configure security rules for data protection
- Get your Firebase configuration credentials

#### 4. Configure Firebase in the project

The Firebase configuration is already set up in `lib/firebase.ts`. Update it with your own Firebase project credentials:

```typescript
// lib/firebase.ts
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### 5. Run the development server

```bash
npm run dev
```

#### 6. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

#### 7. Seed the database (Optional)

To populate your database with sample data:

```bash
# Start the dev server and navigate to:
http://localhost:3000/seed
```

---

## 📁 Project Structure

```
clubconn/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth-related routes
│   │   ├── login/
│   │   └── signup/
│   ├── achievements/             # Achievements page
│   ├── admin-dashboard/          # Admin dashboard
│   ├── c/[slug]/                 # Community pages
│   ├── certificates/             # Certificates pages
│   ├── clubs/                    # Clubs directory
│   │   └── [slug]/               # Individual club pages
│   │       ├── [eventSlug]/      # Event detail pages
│   │       └── admin/            # Club admin dashboard
│   ├── clubconnectadmin/         # Platform admin
│   ├── clubconnectdashboard/     # Super admin dashboard
│   ├── college-admin/            # College admin dashboard
│   ├── communities/              # Communities directory
│   ├── dashboard/                # User dashboard
│   ├── events/                   # Events directory
│   ├── leaderboard/              # Leaderboard page
│   ├── seed/                     # Database seeding
│   ├── sponsorship/              # Sponsorship portal
│   ├── u/[username]/             # User profiles
│   │   └── edit/                 # Profile editing
│   ├── vision/                   # Vision/About page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   │   ├── login-dialog.tsx
│   │   ├── signup-dialog.tsx
│   │   └── username-setup-dialog.tsx
│   ├── profile/                  # Profile components
│   │   ├── profile-view.tsx
│   │   └── profile-edit-form.tsx
│   ├── ui/                       # shadcn/ui components
│   ├── about-section.tsx
│   ├── certificate-card.tsx
│   ├── cta.tsx
│   ├── featured-clubs.tsx
│   ├── feedback-form.tsx
│   ├── flagship-events.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero.tsx
│   ├── how-it-works.tsx
│   ├── programs-section.tsx
│   ├── stats.tsx
│   ├── upcoming-events.tsx
│   └── welcome-toast.tsx
├── contexts/                     # React contexts
│   └── auth-context.tsx          # Authentication context
├── lib/                          # Utility libraries
│   ├── firebase.ts               # Firebase configuration
│   ├── firestore.ts              # Firestore utilities
│   ├── badges.ts                 # Badge definitions
│   ├── certificates.ts           # Certificate utilities
│   ├── dashboard-data.ts         # Dashboard data
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
│   ├── clubconn-logo.png         # Logo
│   └── ...                       # Other images
├── FIREBASE_SETUP.md             # Firebase setup guide
├── README.md                     # This file
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js config
└── .gitignore                    # Git ignore rules
```

---

## 🔧 Environment Setup

### Required Environment Variables

ClubConn uses Vercel's built-in integrations for most services. However, if you're using custom Firebase or other services, you may need to set up environment variables.

Create a `.env.local` file in the root directory (this file is gitignored):

```env
# Firebase Configuration (if using custom project)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Vercel Blob (automatically configured on Vercel)
BLOB_READ_WRITE_TOKEN=your_blob_token

# Optional: Analytics and Monitoring
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

### Vercel Integration

When deploying to Vercel, the following integrations are automatically configured:
- **Vercel Blob**: For file storage and image uploads
- **Vercel Analytics**: For usage analytics and performance monitoring
- **Automatic HTTPS**: SSL certificates for secure connections
- **Edge Functions**: For optimal performance worldwide

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

### Development Workflow

#### 1. Create a new branch for your feature
```bash
git checkout -b feature/your-feature-name
```

#### 2. Make your changes and test locally
```bash
npm run dev
# Test your changes at http://localhost:3000
```

#### 3. Run linting and type checking
```bash
npm run lint
npm run type-check
```

#### 4. Commit your changes
```bash
git add .
git commit -m "feat: add your feature description"
```

#### 5. Push to your branch
```bash
git push origin feature/your-feature-name
```

#### 6. Create a Pull Request
- Go to [GitHub Repository](https://github.com/anupp29/clubconn)
- Click "New Pull Request"
- Describe your changes and submit

### Code Style Guidelines

- ✅ Use TypeScript for all new files
- ✅ Follow the existing component structure and naming conventions
- ✅ Use Tailwind CSS for styling (avoid custom CSS when possible)
- ✅ Use shadcn/ui components for UI elements
- ✅ Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Add comments for complex logic and business rules
- ✅ Keep components small and focused (Single Responsibility Principle)
- ✅ Use proper TypeScript types instead of `any`
- ✅ Test your changes thoroughly before submitting

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: Deploy via GitHub (Automatic)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository: `anupp29/clubconn`

3. **Configure project**
   - Vercel will automatically detect Next.js
   - Add environment variables if needed
   - Click "Deploy"

4. **Set up integrations**
   - Add Vercel Blob integration for file storage
   - Enable Vercel Analytics for monitoring

#### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# The output will be in the .next folder
# Deploy this folder to your hosting provider
```

### Post-Deployment Checklist

- ✅ Verify all pages load correctly
- ✅ Test authentication flows (Email, Google, GitHub)
- ✅ Check database connections
- ✅ Verify API routes are working
- ✅ Test RSVP and event registration
- ✅ Check certificate generation
- ✅ Verify admin dashboards are accessible
- ✅ Test responsive design on mobile devices

---

## 🔒 Security

ClubConn implements multiple layers of security to protect user data and ensure platform integrity:

### Authentication Security
- **Multi-Provider Auth**: Email/Password, Google OAuth, GitHub OAuth
- **Secure Sessions**: Firebase Auth handles session management
- **Password Requirements**: Minimum 6 characters with complexity validation
- **Email Verification**: Required for email/password signups

### Database Security
- **Firestore Security Rules**: Comprehensive rules to control data access
- **User Data Isolation**: Users can only edit their own data
- **Username Uniqueness**: Enforced at database level with unique constraints
- **Profile Privacy**: Public profiles are read-only for non-owners
- **Admin Authorization**: Role-based access control for admin functions

### Input Validation
- **Form Validation**: All forms use Zod schemas for validation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection
- **SQL Injection**: Not applicable (using NoSQL Firestore)

### Best Practices
- Regular security audits of dependencies
- Secure environment variable management
- HTTPS enforcement in production
- Regular Firebase security rules review
- Rate limiting on sensitive operations

---

## 🤝 Contributing

We welcome contributions from the community! ClubConn is open-source and built by students, for students.

### How to Contribute

1. **Fork the repository**
   - Click the "Fork" button on [GitHub](https://github.com/anupp29/clubconn)

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/clubconn.git
   cd clubconn
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow the code style guidelines
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to the [original repository](https://github.com/anupp29/clubconn)
   - Click "New Pull Request"
   - Select your fork and branch
   - Describe your changes in detail

### Contribution Guidelines

- ✅ Follow the existing code style and conventions
- ✅ Write clear, concise commit messages
- ✅ Add tests for new features when applicable
- ✅ Update documentation as needed (README, comments)
- ✅ Ensure your code passes linting (`npm run lint`)
- ✅ Test thoroughly on different devices and browsers
- ✅ Be respectful and constructive in discussions
- ✅ One feature per pull request (keep PRs focused)

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix bugs
- ✨ **New Features**: Propose and implement new features
- 📝 **Documentation**: Improve docs, add examples
- 🎨 **UI/UX**: Enhance design and user experience
- ♿ **Accessibility**: Improve accessibility features
- 🌐 **Internationalization**: Add multi-language support
- ⚡ **Performance**: Optimize speed and efficiency
- 🧪 **Testing**: Add unit and integration tests

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❗ No warranty provided
- ❗ License and copyright notice required

---

## 🙏 Acknowledgments

ClubConn wouldn't be possible without the amazing open-source community and the following:

- **KKWIEER** for supporting student innovation and providing the platform vision
- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful, accessible component library
- **[Vercel](https://vercel.com/)** for hosting, deployment, and edge network
- **[Firebase](https://firebase.google.com/)** for authentication and database services
- **[Next.js Team](https://nextjs.org/)** for the incredible React framework
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- All **contributors** and **users** of ClubConn who make this platform better every day

### Special Thanks

- Our amazing student community at KKWIEER
- Faculty advisors for their guidance and support
- Beta testers who provided valuable feedback
- Open-source contributors who helped improve the codebase

---

## 📞 Support

Need help? We're here for you! Here's how to get support:

### Documentation
- 📖 **Main README**: You're reading it!
- 🔥 **Firebase Setup**: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- 💻 **API Documentation**: Coming soon
- 🎓 **User Guide**: Coming soon

### Community Support
- 💬 **GitHub Discussions**: [Start a discussion](https://github.com/anupp29/clubconn/discussions)
- 🐛 **Bug Reports**: [Open an issue](https://github.com/anupp29/clubconn/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/anupp29/clubconn/issues)
- 📧 **Email**: support@clubconn.com

### Quick Links
- [Live Demo](https://clubconn.vercel.app)
- [GitHub Repository](https://github.com/anupp29/clubconn)
- [Report Bug](https://github.com/anupp29/clubconn/issues)
- [Request Feature](https://github.com/anupp29/clubconn/issues)

---

## 📊 Project Statistics

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/anupp29/clubconn?style=social)
![GitHub forks](https://img.shields.io/github/forks/anupp29/clubconn?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/anupp29/clubconn?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/anupp29/clubconn)
![GitHub issues](https://img.shields.io/github/issues/anupp29/clubconn)
![GitHub pull requests](https://img.shields.io/github/issues-pr/anupp29/clubconn)
![GitHub](https://img.shields.io/github/license/anupp29/clubconn)

</div>

---

<div align="center">

### Built with ❤️ for KKWIEER students by Team ClubConn

**Empowering students to connect, engage, and grow together**

[Website](https://clubconn.vercel.app) · [GitHub](https://github.com/anupp29/clubconn) · [Report Issue](https://github.com/anupp29/clubconn/issues)

---

**⭐ Star us on GitHub — it helps!**

Made with passion by students, for students 🎓

</div>
