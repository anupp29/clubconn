# ClubConn - Your Campus Connection Hub

ClubConn is a comprehensive platform that connects students with all clubs at KKWIEER in one place. Discover clubs, attend events, and build your campus community.

## Features

### 🎯 Landing Page
- Beautiful, modern design with hero section
- Featured clubs showcase
- Upcoming events calendar
- Statistics and social proof
- How it works section

### 👤 User Profiles
- Username-based URLs (`/u/username`)
- Public profiles with login gate for full access
- Customizable profile information
- Social media links (LinkedIn, GitHub, Twitter, Website)
- Achievements and accomplishments
- Club memberships

### 🔐 Authentication
- Email/Password authentication
- Google OAuth
- GitHub OAuth
- Real-time username availability checking
- Secure profile ownership

### ✏️ Profile Editing
- Edit display name and username
- Update bio and profile information
- Manage social links
- Add/remove achievements
- Add/remove club memberships
- Real-time validation

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Authentication:** Firebase Auth
- **Database:** Cloud Firestore
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project set up (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd clubconn
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up Firebase:
   - Follow the instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
   - Firebase configuration is already in `lib/firebase.ts`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
clubconn/
├── app/
│   ├── u/
│   │   └── [username]/
│   │       ├── page.tsx          # Profile viewing page
│   │       ├── edit/
│   │       │   └── page.tsx      # Profile editing page
│   │       └── not-found.tsx     # 404 page for profiles
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── auth/
│   │   ├── login-dialog.tsx      # Login modal
│   │   ├── signup-dialog.tsx     # Signup modal
│   │   └── username-setup-dialog.tsx  # Username setup for OAuth
│   ├── profile/
│   │   ├── profile-view.tsx      # Profile viewing component
│   │   └── profile-edit-form.tsx # Profile editing form
│   ├── ui/                       # shadcn/ui components
│   ├── header.tsx                # Site header
│   ├── hero.tsx                  # Hero section
│   ├── stats.tsx                 # Statistics section
│   ├── featured-clubs.tsx        # Featured clubs section
│   ├── upcoming-events.tsx       # Events section
│   ├── how-it-works.tsx          # How it works section
│   ├── cta.tsx                   # Call to action
│   └── footer.tsx                # Site footer
├── contexts/
│   └── auth-context.tsx          # Authentication context
├── lib/
│   ├── firebase.ts               # Firebase configuration
│   ├── firestore.ts              # Firestore utilities
│   └── utils.ts                  # Utility functions
└── FIREBASE_SETUP.md             # Firebase setup guide
\`\`\`

## Key Features Explained

### Username System

- Usernames are unique and case-insensitive
- Real-time availability checking during signup and editing
- Username reservation system prevents duplicates
- Users can change their username at any time
- Profile URLs automatically update when username changes

### Profile Privacy

- Basic profile information is always public
- Full profile details (achievements, clubs) require login
- Non-logged-in users see a blurred preview with login prompt
- Profile owners can edit their own profiles

### Authentication Flow

1. **Email/Password:**
   - User signs up with email, password, username, and display name
   - Username is validated for uniqueness
   - Profile is created automatically

2. **OAuth (Google/GitHub):**
   - User signs in with OAuth provider
   - If first time, prompted to choose username
   - Profile is created with OAuth information

### Social Links

- LinkedIn, GitHub, Twitter, and personal website
- Links open in new tabs
- Displayed as buttons with icons
- Optional - users can add/remove as needed

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Deploy!

### Environment Variables

No environment variables needed - Firebase configuration is in the code.

## Security

- Firestore security rules ensure users can only edit their own profiles
- Username uniqueness is enforced at the database level
- Authentication is required for profile editing
- Public profiles are read-only for non-owners

## Future Enhancements

- [ ] Profile picture upload
- [ ] Club pages and management
- [ ] Event creation and RSVP
- [ ] Search functionality
- [ ] Notifications system
- [ ] Direct messaging
- [ ] Club admin dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for KKWIEER students
