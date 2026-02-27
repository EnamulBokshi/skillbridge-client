# 🎓 SkillBridge - Online Tutoring Platform

SkillBridge is a comprehensive online tutoring platform that connects students with expert tutors for personalized learning sessions. The platform facilitates skill development through flexible session booking, real-time availability management, and an intuitive dashboard system for all user types.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [User Roles & Functionality](#user-roles--functionality)
- [Key Features Breakdown](#key-features-breakdown)
- [Architecture](#architecture)
- [Development Guide](#development-guide)
- [Deployment](#deployment)

## 🌟 Overview

SkillBridge is a modern, full-stack web application built with Next.js 16 that revolutionizes the way students and tutors connect. The platform provides:

- **For Students**: Browse available tutors, book sessions, manage bookings, track learning progress, and write reviews
- **For Tutors**: Manage availability slots, view scheduled sessions, track earnings, and receive student feedback
- **For Admins**: Comprehensive platform management including users, categories, subjects, slots, and bookings

## ✨ Features

### Core Features
- 🔐 **Authentication & Authorization** - Secure login/signup with role-based access control (Admin, Tutor, Student)
- 👤 **Multi-Role Dashboard** - Customized dashboards for each user type with role-specific functionality
- 📅 **Session Booking System** - Real-time availability checking and booking confirmation
- 💳 **Payment Integration** - Secure payment processing for session bookings
- ⭐ **Review & Rating System** - Students can review and rate tutors after sessions
- 🎯 **Advanced Search & Filtering** - Find tutors by subject, category, availability, and ratings
- 📊 **Analytics Dashboard** - Revenue tracking, booking statistics, and performance metrics
- 🌓 **Dark/Light Mode** - Theme toggling with persistent preferences
- 📱 **Responsive Design** - Fully responsive UI that works on all device sizes

### Student Features
- Browse featured tutors and available sessions
- View tutor profiles with ratings and reviews
- Book sessions with preferred tutors
- Manage booking history and upcoming sessions
- Write reviews and rate tutors
- Profile management

### Tutor Features
- Create and manage availability slots
- View scheduled sessions and booking history
- Track earnings and session statistics
- Manage tutor profile and expertise
- View student reviews and ratings
- Session history tracking

### Admin Features
- **User Management** - View, edit, and manage all platform users
- **Category Management** - Create and organize subject categories
- **Subject Management** - Add and manage tutoring subjects
- **Slot Management** - Oversee all tutor availability slots
- **Booking Management** - Monitor and manage all platform bookings
- **Analytics Dashboard** - Platform-wide statistics and revenue tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler.io/icons)
- **State Management**: React Server Components & Client Components
- **Form Handling**: [@tanstack/react-form](https://tanstack.com/form) - Type-safe form management
- **Data Tables**: [@tanstack/react-table](https://tanstack.com/table) - Headless table library
- **Charts**: [Recharts 2](https://recharts.org/) - Composable charting library
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/) - Modern drag and drop toolkit
- **Authentication**: [Better Auth](https://better-auth.com/) - Modern authentication library
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- **Date Utilities**: [date-fns 4](https://date-fns.org/) - Modern date utility library
- **Validation**: [Zod 4](https://zod.dev/) - TypeScript-first schema validation

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Linting**: [ESLint 9](https://eslint.org/) - Code quality and consistency
- **Environment Variables**: [@t3-oss/env-nextjs](https://env.t3.gg/) - Type-safe environment variables
- **CSS Processing**: [PostCSS](https://postcss.org/) - CSS transformations

### Backend Integration
- **API**: RESTful API with Next.js API routes
- **Backend URL**: `https://skill-bridge-server-seven.vercel.app`
- **Authentication**: Better Auth with session management
- **API Client**: Native fetch with TypeScript types

## 📁 Project Structure

```
client/
├── action/                    # Server actions for data mutations
│   ├── admin.action.ts       # Admin-specific actions
│   ├── booking.action.ts     # Booking operations
│   ├── category.action.ts    # Category management
│   ├── slot.action.ts        # Slot management
│   ├── student.action.ts     # Student operations
│   ├── subject.action.ts     # Subject management
│   ├── tutor.action.ts       # Tutor operations
│   └── user.action.ts        # User management
│
├── app/                      # Next.js App Router
│   ├── (commonLayout)/       # Public pages layout
│   │   ├── about-us/         # About page
│   │   ├── complete-registration/  # Registration completion
│   │   ├── confirm-booking/  # Booking confirmation
│   │   ├── login/            # Login page
│   │   ├── payment/          # Payment processing
│   │   ├── sessions/         # Browse sessions
│   │   ├── signup/           # User registration
│   │   ├── tutors/           # Tutor listings
│   │   └── page.tsx          # Homepage
│   │
│   ├── (dashboardLayout)/    # Authenticated dashboard layout
│   │   └── dashboard/        # Role-based dashboards
│   │       ├── admin/        # Admin dashboard & management
│   │       ├── student/      # Student dashboard
│   │       └── tutor/        # Tutor dashboard
│   │
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Loading state
│   └── not-found.tsx         # 404 page
│
├── components/               # React components
│   ├── layout/              # Layout components
│   │   ├── AdminStatsCard.tsx
│   │   ├── BookingStatusChart.tsx
│   │   ├── CompleteRegistrationLayout.tsx
│   │   ├── Footer.tsx
│   │   ├── ModeToggler.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotFound.tsx
│   │   ├── RevinueChart.tsx
│   │   └── SlotHistory.tsx
│   │
│   ├── modules/             # Feature-specific components
│   │   ├── authentication/  # Login, signup forms
│   │   ├── booking/         # Booking components
│   │   ├── category/        # Category management
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── slot/            # Slot management components
│   │   ├── subject/         # Subject components
│   │   ├── tutors/          # Tutor-related components
│   │   └── users/           # User management components
│   │
│   ├── review/              # Review system components
│   │   ├── ReviewList.tsx
│   │   ├── StarRating.tsx
│   │   └── WriteReview.tsx
│   │
│   └── ui/                  # Reusable UI components (Radix UI based)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       └── ... (40+ components)
│
├── constants/               # Application constants
│   └── index.ts            # User roles and other constants
│
├── helper/                  # Utility helper functions
│   ├── buildFetchConfig.ts # Fetch configuration builder
│   ├── currencyFormatter.ts # Currency formatting
│   ├── dateFormatter.ts    # Date formatting utilities
│   ├── generateSlug.ts     # Slug generation
│   ├── handleSearchParams.ts # URL search params handler
│   └── logout.ts           # Logout functionality
│
├── hooks/                   # Custom React hooks
│   └── use-mobile.ts       # Mobile detection hook
│
├── lib/                     # Library configurations
│   ├── auth-client.ts      # Better Auth client setup
│   └── utils.ts            # Utility functions (cn, etc.)
│
├── providers/               # Context providers
│   └── ThemeProvider.tsx   # Theme provider wrapper
│
├── routes/                  # Route definitions
│   ├── adminRoutes.ts      # Admin sidebar routes
│   ├── studentRoutes.ts    # Student sidebar routes
│   └── tutorRoutes.ts      # Tutor sidebar routes
│
├── services/                # API service layer
│   ├── admin.service.ts    # Admin API calls
│   ├── booking.service.ts  # Booking API calls
│   ├── category.service.ts # Category API calls
│   ├── slot.service.ts     # Slot API calls
│   ├── student.service.ts  # Student API calls
│   ├── subject.service.ts  # Subject API calls
│   ├── tutor.service.ts    # Tutor API calls
│   └── user.service.ts     # User API calls
│
├── types/                   # TypeScript type definitions
│   ├── admin-dashboard.type.ts
│   ├── bookings.type.ts
│   ├── category.type.ts
│   ├── index.ts
│   ├── slot.type.ts
│   ├── student.type.ts
│   ├── subject.type.ts
│   ├── tutor.type.ts
│   └── user.type.ts
│
├── env.ts                   # Environment variable validation
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.17 or higher
- **pnpm** v8.0 or higher (recommended) or npm/yarn
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SkillBridge/client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Then update the values (see [Environment Variables](#environment-variables) section)

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open the application**
   
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# API URLs
API_URL=https://skill-bridge-server-seven.vercel.app/api
AUTH_URL=http://localhost:3000/api/auth

# Public URLs (accessible in browser)
NEXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
NEXT_PUBLIC_API_URL=https://skill-bridge-server-seven.vercel.app/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Environment Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `API_URL` | Server-side API endpoint | `https://skill-bridge-server-seven.vercel.app/api` |
| `AUTH_URL` | Server-side authentication endpoint | `http://localhost:3000/api/auth` |
| `NEXT_PUBLIC_AUTH_URL` | Client-side authentication endpoint | `http://localhost:3000/api/auth` |
| `NEXT_PUBLIC_API_URL` | Client-side API endpoint | `https://skill-bridge-server-seven.vercel.app/api` |
| `NEXT_PUBLIC_APP_URL` | Application base URL | `http://localhost:3000` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server on http://localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint for code quality checks

# Package Management
pnpm install      # Install all dependencies
```

## 👥 User Roles & Functionality

### 🎓 Student Role
**Access**: `/dashboard/student`

**Capabilities**:
- Browse and search for tutors by subject, category, and availability
- View tutor profiles with detailed information and reviews
- Book tutoring sessions with available time slots
- Manage upcoming and past bookings
- Make payments for booked sessions
- Write reviews and rate tutors after sessions
- Update personal profile information
- View booking history and session details

### 👨‍🏫 Tutor Role
**Access**: `/dashboard/tutor`

**Capabilities**:
- Create and manage availability slots (date, time, duration)
- View scheduled sessions with student information
- Track session history and completed bookings
- View student reviews and ratings
- Update tutor profile and expertise areas
- Manage subjects offered
- View earnings and session statistics
- Control slot availability status

### 🛡️ Admin Role
**Access**: `/dashboard/admin`

**Capabilities**:
- **User Management**: View, activate/deactivate, and manage all users (students, tutors, admins)
- **Category Management**: Create, update, and delete subject categories
- **Subject Management**: Manage all tutoring subjects and their categories
- **Slot Management**: Oversee all tutor availability slots across the platform
- **Booking Management**: Monitor all bookings, approve/reject, and handle disputes
- **Analytics Dashboard**: View platform-wide statistics including:
  - Total revenue and booking trends
  - User growth metrics
  - Popular subjects and categories
  - Tutor performance metrics
  - Booking status distribution
- Full CRUD operations on all platform entities

## 🎯 Key Features Breakdown

### Authentication System
- **Technology**: Better Auth with session-based authentication
- **Features**:
  - Email/password authentication
  - Role-based access control (RBAC)
  - Secure session management
  - Protected routes and API endpoints
  - Password encryption and security

### Booking Flow
1. **Discovery**: Students browse available tutors and sessions
2. **Selection**: Choose tutor, subject, and available time slot
3. **Confirmation**: Review booking details and tutor information
4. **Payment**: Secure payment processing
5. **Completion**: Booking confirmation with session details
6. **Review**: Post-session review and rating system

### Dashboard System
Each role has a customized dashboard built with:
- **Sidebar Navigation**: Role-specific menu items
- **Stats Cards**: Key metrics and KPIs
- **Data Tables**: Sortable, filterable, paginated tables
- **Charts**: Visual analytics using Recharts
- **Quick Actions**: Context-specific action buttons

### Search & Filter System
- Real-time search across tutors and sessions
- Multi-criteria filtering:
  - Subject categories
  - Tutor ratings
  - Price range
  - Availability dates
  - Subject expertise
- URL-based state management for shareable links
- Optimized server-side filtering

### Review & Rating System
- 5-star rating system
- Written review comments
- Review display on tutor profiles
- Aggregate rating calculations
- Review moderation capabilities (admin)

## 🏗️ Architecture

### Design Patterns
- **Component Architecture**: Atomic design principles with reusable UI components
- **Service Layer**: Separated API logic in services directory
- **Server Actions**: Next.js server actions for mutations
- **Type Safety**: Full TypeScript coverage with strict mode
- **File-Based Routing**: Next.js App Router with nested layouts

### Data Flow
```
User Interaction → Component → Server Action/Service → API → Backend
                                                              ↓
                                                         Database
                                                              ↓
Response ← Component ← Server Component/Client State ← API Response
```

### State Management
- **Server State**: React Server Components for initial data
- **Client State**: React hooks and context for interactive features
- **Form State**: @tanstack/react-form for complex forms
- **URL State**: Search params for filters and pagination

## 💻 Development Guide

### Project Conventions
- **Naming**: Use kebab-case for files, PascalCase for components
- **Components**: Organize by feature in `components/modules/`
- **Types**: Define types in `types/` directory with meaningful names
- **Services**: Keep API calls in `services/` directory
- **Actions**: Server mutations in `action/` directory

### Adding a New Feature

1. **Create Types** (if needed)
   ```typescript
   // types/feature.type.ts
   export interface Feature {
     id: string;
     name: string;
   }
   ```

2. **Create Service**
   ```typescript
   // services/feature.service.ts
   export const getFeatures = async () => {
     // API call logic
   }
   ```

3. **Create Server Action** (for mutations)
   ```typescript
   // action/feature.action.ts
   'use server'
   export const createFeature = async (data: FeatureInput) => {
     // Mutation logic
   }
   ```

4. **Create Components**
   ```typescript
   // components/modules/feature/FeatureList.tsx
   export default function FeatureList() {
     // Component logic
   }
   ```

5. **Add Route**
   ```typescript
   // app/dashboard/feature/page.tsx
   import FeatureList from '@/components/modules/feature/FeatureList'
   ```

### Best Practices
- Use Server Components by default, Client Components only when needed
- Implement proper error handling with try-catch blocks
- Add loading states for better UX
- Use TypeScript types for all function parameters and returns
- Follow responsive design principles
- Implement proper accessibility (a11y) features
- Use environment variables for configuration
- Write reusable, composable components

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Sign in to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - Add all environment variables from `.env.local` in Vercel dashboard
   - Update `NEXT_PUBLIC_APP_URL` to your production domain

4. **Deploy**
   - Vercel automatically deploys on every push to main branch
   - Production URL will be provided

### Manual Deployment

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

### Environment-Specific Configurations

**Production**:
- Update API URLs to production endpoints
- Enable production optimizations
- Configure proper CORS settings
- Set up monitoring and analytics

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of an assignment for Programming Hero.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Authentication by [Better Auth](https://better-auth.com/)

---

**Built with ❤️ by the SkillBridge Team**
