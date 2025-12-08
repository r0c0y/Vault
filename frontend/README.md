# Vault Frontend

Modern, responsive frontend for the Vault Developer Portfolio & Collaboration Hub. Built with Next.js, React, and TailwindCSS.

## ✨ Features

### Pages
- **Home**: Hero section, featured drops, feature grid, call-to-action
- **Explore**: Project feed with search, filters, and pagination
- **Match**: Swipe-style project discovery
- **Dashboard**: User project management
- **Profile**: Developer portfolio page
- **Auth**: Login/Signup with themed design
- **404**: Custom error page with Lottie animation

### Components
- **Showcase**: Daily rotating top-voted projects
- **Project Cards**: Interactive project displays with tech stack
- **Newsletter**: Email subscription with audio feedback
- **Mimo Mascot**: Animated mascot with subtle bounce effect
- **Responsive Navigation**: Mobile-friendly header

### Design System
- **Colors**: Dark theme with pastel accents (Sky Blue, Mint, Pink)
- **Typography**: Space Grotesk headings, Inter body text
- **Effects**: Glassmorphism, glow shadows, smooth animations
- **Backgrounds**: Abstract geometric patterns, gradient overlays

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS 3
- **Animations**: GSAP, Lottie React
- **Icons**: Lucide React
- **State**: React Context API
- **HTTP**: Axios
- **Sound**: Custom useSound hook

## 📂 Folder Structure

```
frontend/
├── components/
│   ├── home/          # Home page components
│   │   ├── Hero.jsx
│   │   ├── Showcase.jsx
│   │   ├── FeatureGrid.jsx
│   │   └── CallToAction.jsx
│   ├── projects/      # Project-related components
│   │   └── ProjectCard.jsx
│   └── shared/        # Reusable components
│       ├── Button.jsx
│       ├── Card.jsx
│       └── Input.jsx
├── pages/             # Next.js routes
│   ├── index.jsx      # Home page
│   ├── explore.jsx    # Project feed
│   ├── match.jsx      # Swipe mode
│   ├── dashboard.jsx  # User dashboard
│   ├── login.jsx      # Authentication
│   ├── signup.jsx
│   └── 404.jsx        # Custom error page
├── lib/               # Utilities
│   ├── AuthContext.js # Auth state management
│   ├── api.js         # API client
│   └── constants.js   # App constants
├── hooks/             # Custom React hooks
│   └── useSound.js
├── public/
│   ├── assets/        # Images, animations
│   └── sounds/        # Audio files
└── styles/
    └── globals.css    # Global styles
```

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `primary`: Sky Blue (#89B4FA)
- `secondary`: Mint Green (#A6E3A1)
- `highlight`: Warm Pink (#F5C2E7)

### Animations
Lottie animations are in `public/assets/`. Replace JSON files to customize.

## 🔧 Key Features Implementation

### Featured Drops
- Fetches top 3 voted projects daily
- Displays current day with dynamic text
- Animated project cards

### Auth Pages
- Themed to match site design
- Background images with overlays
- Glassmorphic form containers

### 404 Page
- Lottie animation for visual feedback
- Branded messaging
- Quick navigation back home

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Hidden elements on mobile (mascot, decorative braces)

## 🚀 Performance

- Next.js automatic code splitting
- Image optimization
- Dynamic imports for heavy components (Lottie)
- Lazy loading for project images

## 🔗 API Integration

All API calls go through `lib/api.js` which handles:
- Base URL configuration
- Request/response interceptors
- Error handling
- Token management
