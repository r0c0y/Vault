# Vault - Developer Portfolio & Collaboration Hub

Vault is more than just a portfolio platform it's a thriving community for developers to showcase their best work, discover amazing projects, and connect with like-minded peers. 

It serves as a central hub where you can curate your personal "Work Shelf" of projects while exploring a vibrant "Explore Stream" of creativity from the community. Whether you're looking for inspiration, feedback, or your next collaborator, Vault is the place to be.

![Vault Banner](frontend/public/vault-banner.png)

## 🚀 Features

- **Work Shelf (Dashboard):** A dedicated space to manage your projects, keeping drafts private and publishing your best work to the world.
- **Explore Stream:** A visually stunning masonry grid layout to discover projects from the community.
- **Project Showcase:** Detailed project views with rich media support, tech stack tags, and direct links to code and live demos.
- **Developer Profiles:** Your professional identity, showcasing your bio, skills, and portfolio in one place.
- **Match Mode:** A fun, interactive way to discover random projects and vote for your favorites.
- **Authentication:** Secure and seamless JWT-based login and signup system.
- **Design:** "InkGraphite Pastel" theme featuring glassmorphism, smooth GSAP animations, and a fully responsive layout for all devices.

### ✨ Coming Soon
- **Networking & Collaboration:** Connect with other developers and request to collaborate on projects.
- **Villages:** Work sessions with each other on projects you love.
- **Community Announcements:** Updates for the community.
- **Advanced Analytics:** See who's viewing your projects (dashboard analytics).

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
| `GET` | `/api/projects/match` | Get random projects for matching |
| `POST` | `/api/projects/:id/vote` | Vote for a project |

## 🎨 Design System

**Theme:** InkGraphite Pastel
- **Background:** `#0D0F12` (Deep Charcoal)
- **Primary:** `#89B4FA` (Pastel Sky Blue)
- **Secondary:** `#A6E3A1` (Pastel Mint)
- **Font:** Inter (Body) + Space Grotesk (Headings)
