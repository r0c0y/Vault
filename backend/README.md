# Vault Backend

Authentication and Project Management API for the Vault platform. Built with Express, Prisma, and MongoDB.

## 🚀 Details
A robust backend providing JWT authentication, user management, and project CRUD operations.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Prisma ORM)
- **Auth**: JWT (Access + Refresh Tokens)
- **Security**: bcryptjs, cors, helmet

## 📂 Folder Structure
```
backend/
├── prisma/          # Database schema
├── src/
│   ├── controllers/ # Business logic (Auth, Projects)
│   ├── routes/      # API Endpoints
│   ├── middlewares/ # Auth checks
│   ├── utils/       # Helpers
│   └── app.js       # App setup
```

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Create a `.env` file with your credentials:
```env
PORT=4000
DATABASE_URL="mongodb+srv://..."
JWT_ACCESS_SECRET="your_secret"
JWT_REFRESH_SECRET="your_secret"
FRONTEND_URL="http://localhost:3000"
ADMIN_SECRET="secret"
```

### 3. Initialize Database
```bash
npx prisma generate
```

### 4. Start Server
```bash
npm run dev
```
Server runs on [http://localhost:4000](http://localhost:4000).

## 🔌 API Endpoints (Brief)
- **Auth**: `/api/auth` (Signup, Login, Refresh, Logout, Me)
- **Projects**: `/api/projects` (CRUD, Match, Vote)
- **Newsletter**: `/api/newsletter` (Subscribe)
