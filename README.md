# Vault

**Developer Portfolio & Collaboration Hub**

Vault is a modern platform for developers to showcase their projects, discover community work, and connect with peers. Share your code, get feedback, and build your developer legacy.

![Vault Banner](frontend/public/vault-banner.png)

## ✨ Features

- **Project Showcase**: Display your work with images, tech stack, and live demos
- **Featured Drops**: Daily rotating top-voted community projects
- **Explore Feed**: Discover projects with advanced filtering and search
- **Match Mode**: Swipe-style project discovery
- **User Profiles**: Build your developer portfolio
- **Newsletter**: Stay updated with early access features
- **Dark Theme**: Beautiful, modern UI with glassmorphism effects

## 📂 Project Structure

```
Vault/
├── backend/         # Node.js/Express API & Database
│   ├── prisma/      # Database schema
│   └── src/         # Controllers, routes, middleware
│
├── frontend/        # Next.js Application
│   ├── components/  # Reusable UI components
│   ├── pages/       # Routes & views
│   └── public/      # Static assets
│
└── docs/            # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB database
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, FRONTEND_URL, ADMIN_SECRET

npx prisma generate
npm run dev
```
Backend runs on `http://localhost:5001`

### 2. Frontend Setup
```bash
cd frontend
npm install

# Create .env.local with:
# NEXT_PUBLIC_API_URL=http://localhost:5001/api

npm run dev
```
Frontend runs on `http://localhost:3000`

## 🛠 Tech Stack

**Frontend**
- Next.js 14
- React 18
- TailwindCSS 3
- Lottie React (animations)
- Lucide Icons
- GSAP

**Backend**
- Express.js
- Prisma ORM
- MongoDB
- JWT Authentication
- bcryptjs

## 📚 Documentation

- [Frontend README](frontend/README.md) - Frontend architecture and components
- [Backend README](backend/README.md) - API endpoints and database schema

## 🎨 Design Features

- Glassmorphic UI elements
- Smooth animations and transitions
- Responsive design (mobile-first)
- Custom 404 page with Lottie animation
- Background effects and gradients
- Interactive mascot (Mimo)

## 🔐 Authentication

- JWT-based auth with access and refresh tokens
- Secure password hashing
- Protected routes
- User session management

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

## 📝 License

MIT License - feel free to use this project for learning purposes.
