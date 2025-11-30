# Vault - Developer Portfolio & Collaboration Hub

Vault is a minimal, elegant platform where developers can curate their best work and explore others' creations. It combines a personal "Work Shelf" for managing projects with a public "Explore Stream" for community discovery.

![Vault Banner](https://via.placeholder.com/1200x600?text=Vault+Preview)

## 🚀 Features

- **Work Shelf (Dashboard):** Manage your projects (Drafts vs Published).
- **Explore Stream:** Discover projects from the community with a masonry grid layout.
- **Project Showcase:** Beautiful, detailed project views with tech stack and images.
- **Developer Profiles:** Showcase your bio, skills, and portfolio.
- **Collaboration (Coming Soon):** Request to collaborate on interesting projects.
- **Authentication:** Secure JWT-based login and signup.
- **Design:** "InkGraphite Pastel" theme with glassmorphism and smooth GSAP animations.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Animations:** GSAP
- **Icons:** Lucide React
- **State/Auth:** Context API + Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Prisma ORM)
- **Authentication:** JWT (JSON Web Tokens)

## 📂 Folder Structure

```
Vault/
├── backend/
│   ├── prisma/          # Database schema
│   ├── src/
│   │   ├── controllers/ # Logic for Auth and Projects
│   │   ├── routes/      # API Endpoints
│   │   ├── middlewares/ # Auth verification
│   │   └── utils/       # Helper functions
│   └── server.js        # Entry point
│
└── frontend/
    ├── components/      # Reusable UI (Button, Card, Navbar)
    ├── pages/           # Next.js Routes (Dashboard, Explore)
    ├── lib/             # API client and Auth Context
    └── styles/          # Global styles & Tailwind config
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Database URL

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env file with DATABASE_URL and JWT_SECRET
npx prisma generate
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL
npm run dev
```

## 🔌 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `GET` | `/api/projects` | Get all published projects (Explore) |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/projects/:id` | Get project details |
| `PUT` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |

## 🎨 Design System

**Theme:** InkGraphite Pastel
- **Background:** `#0D0F12` (Deep Charcoal)
- **Primary:** `#89B4FA` (Pastel Sky Blue)
- **Secondary:** `#A6E3A1` (Pastel Mint)
- **Font:** Inter (Body) + Space Grotesk (Headings)

## 📄 License
MIT License. Created for Capstone Project.
