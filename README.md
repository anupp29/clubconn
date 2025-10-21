# ClubConn - Your Campus Connection Hub 🎓

<div align="center">

![ClubConn Logo](public/clubconn-logo.png)

**Connecting KKWIEER's Ecosystem - One Platform for All Clubs, Events, and Communities**

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.3-orange?logo=firebase)](https://firebase.google.com/)

[Live Demo](https://clubconn.vercel.app) · [Report Bug](https://github.com/your-repo/issues) · [Request Feature](https://github.com/your-repo/issues)

</div>

---

## 📋 Table of Contents

- [About ClubConn](#about-clubconn)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About ClubConn

ClubConn is a comprehensive platform designed to connect students with all clubs, events, and communities at KKWIEER in one centralized hub. Whether you're looking to discover new clubs, attend exciting events, track your achievements, or build your campus network, ClubConn is your one-stop destination.

### Why ClubConn?

- **Centralized Hub**: All clubs, events, and communities in one place
- **Easy Discovery**: Find clubs and events that match your interests
- **Track Progress**: Monitor your achievements, certificates, and participation
- **Community Building**: Connect with like-minded students and grow together
- **Admin Tools**: Powerful dashboards for club admins and college administrators

---

## ✨ Features

### 🏠 Landing Page
- Modern, responsive hero section with animated grid background
- Featured clubs showcase with color-coded cards
- Upcoming events calendar
- Real-time statistics and social proof
- How it works section
- Comprehensive footer with all links

### 🎪 Events Management
- Browse all upcoming and past events
- Filter by category, date, and club
- Event detail pages with RSVP functionality
- Volunteer registration system
- Event proposals and sponsorship management
- Event reports with certificates

### 🏛️ Clubs Directory
- Comprehensive list of all campus clubs
- Color-coded club cards with hover effects
- Detailed club pages with:
  - About section with mission and vision
  - Committee members showcase
  - Past events gallery
  - Upcoming events timeline
  - Quick navigation menu

### 🌐 Communities
- Six major communities: Tech, Cultural, Business, Sports, Creative, Social
- Community-specific event listings
- Member statistics and engagement metrics
- Community-specific color themes

### 👤 User Profiles
- Username-based URLs (`/u/username`)
- Public profiles with privacy controls
- Customizable profile information
- Social media integration (LinkedIn, GitHub, Twitter, Website)
- Achievements and accomplishments showcase
- Club memberships display
- Profile editing with real-time validation

### 🏆 Achievements System
- Badge collection and progress tracking
- Multiple badge categories:
  - Participation badges
  - Leadership badges
  - Skill badges
  - Special recognition badges
- Progress indicators for locked badges
- Achievement showcase on profiles

### 📜 Certificates
- Digital certificate generation
- Certificate verification system
- Download certificates as PDF
- Share certificates on social media
- Certificate gallery with filtering
- QR code verification

### 📊 Dashboard
- Personalized activity feed
- Quick stats overview (events attended, clubs joined, certificates earned)
- Upcoming events recommendations
- Recent activity timeline
- AI-powered event recommendations
- Quick access to all features

### 🏅 Leaderboard
- Campus-wide ranking system
- Top 3 podium display
- Points-based ranking
- Filter by timeframe (all-time, monthly, weekly)
- User statistics and achievements

### 🔐 Authentication
- Email/Password authentication
- Google OAuth integration
- GitHub OAuth integration
- Real-time username availability checking
- Secure profile ownership
- Username setup for OAuth users

### 👨‍💼 Admin Dashboards

#### Club Admin Dashboard
- Event management (create, edit, delete)
- Member management
- Volunteer tracking
- Proposal review
- Sponsorship management
- Analytics and insights

#### College Admin Dashboard
- Platform-wide statistics
- User management
- Club oversight
- Event approval system
- Report generation
- Activity monitoring

### 💼 Sponsorship Portal
- Browse sponsorship opportunities
- Submit sponsorship proposals
- Track sponsorship status
- Sponsor dashboard with analytics
- ROI tracking

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
- **Code Quality**: ESLint, TypeScript
- **Version Control**: Git

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
git clone https://github.com/your-username/clubconn.git
cd clubconn
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Set up Firebase

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication providers
- Set up Firestore database
- Configure security rules
- Get your Firebase configuration

#### 4. Configure Firebase in the project

The Firebase configuration is already set up in `lib/firebase.ts`. If you need to use your own Firebase project, update the configuration:

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

---

## 📁 Project Structure

```
clubconn/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth-related routes
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
└── next.config.mjs               # Next.js config
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
```

### Vercel Integration

When deploying to Vercel, the following integrations are automatically configured:
- **Vercel Blob**: For file storage
- **Vercel Analytics**: For usage analytics

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
```

### Development Workflow

#### 1. Create a new branch for your feature
```bash
git checkout -b feature/your-feature-name
```

#### 2. Make your changes and test locally

#### 3. Commit your changes
```bash
git add .
git commit -m "Add your feature description"
```

#### 4. Push to your branch
```bash
git push origin feature/your-feature-name
```

#### 5. Create a Pull Request on GitHub

### Code Style Guidelines

- Use TypeScript for all new files
- Follow the existing component structure
- Use Tailwind CSS for styling (avoid custom CSS)
- Use shadcn/ui components when possible
- Write meaningful commit messages
- Add comments for complex logic

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### 1. Push your code to GitHub

#### 2. Import project in Vercel
- Go to [vercel.com](https://vercel.com/)
- Click "New Project"
- Import your GitHub repository

#### 3. Configure project
- Vercel will automatically detect Next.js
- Add environment variables if needed
- Click "Deploy"

#### 4. Set up integrations
- Add Vercel Blob integration
- Enable Vercel Analytics

### Manual Deployment

```bash
# Build the project
npm run build

# The output will be in the .next folder
# Deploy this folder to your hosting provider
```

---

## 🔒 Security

- **Firestore Security Rules**: Ensure users can only edit their own data
- **Authentication**: Required for all sensitive operations
- **Username Uniqueness**: Enforced at database level
- **Profile Privacy**: Public profiles are read-only for non-owners
- **Input Validation**: All forms use Zod schemas for validation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Next.js built-in CSRF protection

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **KKWIEER** for supporting student innovation
- **shadcn/ui** for the beautiful component library
- **Vercel** for hosting and deployment
- **Firebase** for backend services
- All contributors and users of ClubConn

---

## 📞 Support

Need help? Here's how to get support:

- **Documentation**: Check this README and [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Issues**: [Open an issue](https://github.com/your-repo/issues) on GitHub
- **Email**: support@clubconn.com
- **Discord**: Join our community server

---

## 🗺️ Roadmap

### Upcoming Features

- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Direct messaging between users
- [ ] Advanced search and filters
- [ ] Club analytics dashboard
- [ ] Event check-in system with QR codes
- [ ] Integration with college ERP system
- [ ] Multi-language support
- [ ] Dark mode improvements
- [ ] Accessibility enhancements

---

<div align="center">

**Built with ❤️ for KKWIEER students by Team ClubConn**

[Website](https://clubconn.vercel.app) · [GitHub](https://github.com/your-repo) · [Twitter](https://twitter.com/clubconn)

</div>
