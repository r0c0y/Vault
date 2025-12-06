# Vault

**Developer Portfolio & Collaboration Hub.**

Vault is a platform for developers to showcase their work, explore community projects, and connect with peers.

![Vault Banner](frontend/public/vault-banner.png)

## 📂 Folder Structure

```
Vault/
├── backend/         # Node.js/Express API & Database
│   ├── prisma/      # Database schema
│   └── src/         # Source code
│
├── frontend/        # Next.js Application
│   ├── components/  # Reusable UI
│   └── pages/       # Routes & Views
│
└── docs/            # Project documentation
```

## ⚡ Getting Started

**Prerequisites:** Node.js (v16+) and MongoDB.

### 1. Backend Setup
```bash
cd backend
npm install
# Create .env with DATABASE_URL, JWT_SECRETS, etc.
npx prisma generate
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL
npm run dev
```

## 🛠 Tech Stack
- **Frontend**: Next.js, TailwindCSS, GSAP
- **Backend**: Express.js, Prisma, MongoDB
- **Auth**: JWT Authentication

See [Frontend README](frontend/README.md) and [Backend README](backend/README.md) for more details.
