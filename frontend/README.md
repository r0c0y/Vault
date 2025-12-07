# Vault Frontend

A modern, responsive frontend for the Vault Developer Portfolio & Collaboration Hub. Built with Next.js, React, and TailwindCSS.

## 🚀 Application
[**Launch App**](https://vault-weld-beta.vercel.app) *(Replace with actual link if different)*

## ✨ Features
- **Work Shelf**: Manage your personal projects.
- **Explore Stream**: Discover community projects with masonry grid layout.
- **Match Mode**: "Swap-style" matching to find interesting projects.
- **Newsletter**: Early access waitlist with email verification.
- **Responsive Design**: Looks great on desktop and mobile.

## 🛠 Tech Stack
- **Framework**: Next.js 14
- **Styling**: TailwindCSS 3, GSAP
- **State**: Context API
- **Icons**: Lucide React

## 📂 Folder Structure
```
frontend/
├── components/      # Reusable UI components
│   ├── home/        # Home page specific
│   ├── projects/    # Project related components
│   └── shared/      # Generic shared components
├── pages/           # Next.js Routes
├── lib/             # Utilities and Context
│   └── api/         # API Client modules
└── styles/          # Global styles
```

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your backend URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
