# Vault Backend

RESTful API for the Vault platform. Handles authentication, project management, and user data. Built with Express, Prisma, and MongoDB.

## 🚀 Features

- JWT-based authentication (access + refresh tokens)
- User registration and login
- Project CRUD operations
- Project voting system
- Newsletter subscriptions
- Admin dashboard endpoints
- Search and filtering
- Pagination support

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Prisma
- **Auth**: JWT, bcryptjs
- **Security**: helmet, cors
- **Validation**: express-validator

## 📂 Folder Structure

```
backend/
├── prisma/
│   └── schema.prisma      # Database models
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── projects/
│   │   │   ├── crud.controller.js
│   │   │   ├── feed.controller.js
│   │   │   └── vote.controller.js
│   │   ├── newsletter.controller.js
│   │   └── admin.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── projects.routes.js
│   │   ├── newsletter.routes.js
│   │   └── admin.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── admin.middleware.js
│   ├── utils/
│   │   └── jwt.js
│   ├── app.js             # Express app setup
│   └── server.js          # Server entry point
└── package.json
```

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env` file:
```env
PORT=5001
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/vault"
JWT_ACCESS_SECRET="your-access-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
FRONTEND_URL="http://localhost:3000"
ADMIN_SECRET="your-admin-secret"
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm start
```
Server runs on `http://localhost:5001`

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user
- `GET /me` - Get current user

### Projects (`/api/projects`)
- `GET /` - Get all projects (with filters, search, pagination)
- `GET /:id` - Get single project
- `POST /` - Create project (auth required)
- `PUT /:id` - Update project (auth required)
- `DELETE /:id` - Delete project (auth required)
- `POST /:id/vote` - Vote on project (auth required)
- `GET /match` - Get random project for matching
- `GET /user/:userId` - Get user's projects

### Newsletter (`/api/newsletter`)
- `POST /subscribe` - Subscribe to newsletter

### Admin (`/api/admin`)
- `GET /stats` - Get platform statistics (admin only)
- `GET /projects` - Get all projects with admin view (admin only)
- `PUT /projects/:id/publish` - Toggle project visibility (admin only)

## 🗄️ Database Schema

### User
- id, name, email, password (hashed)
- avatarUrl, bio, githubUrl, linkedinUrl
- refreshToken
- createdAt, updatedAt

### Project
- id, title, description
- repoUrl, liveUrl
- images (array)
- techStack (array)
- userId (relation to User)
- votes, views
- isPublished
- createdAt, updatedAt

### Newsletter
- id, email
- createdAt

## 🔐 Authentication Flow

1. User signs up/logs in
2. Server generates access token (15m) and refresh token (7d)
3. Access token sent in response, refresh token stored in DB
4. Client includes access token in Authorization header
5. When access token expires, client uses refresh token to get new access token
6. On logout, refresh token is removed from DB

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token validation
- CORS configuration
- Helmet for HTTP headers
- Protected routes with middleware
- Admin-only endpoints

## 📊 Query Features

### Filtering
- By tech stack
- By user
- Published/unpublished (admin)

### Sorting
- Most recent
- Most voted
- Most viewed

### Search
- By title
- By description
- By tech stack

### Pagination
- Page-based pagination
- Configurable page size
- Total count in response

## 🔧 Development

### Adding New Endpoints
1. Create controller in `src/controllers/`
2. Define routes in `src/routes/`
3. Add route to `src/app.js`
4. Update this README

### Database Changes
1. Update `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Run `npx prisma db push`

## 🐛 Error Handling

All endpoints return consistent error responses:
```json
{
  "message": "Error description",
  "error": "Error details (dev mode only)"
}
```

## 📝 Response Format

Success responses follow this structure:
```json
{
  "data": {},
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## 🚀 Deployment

1. Set environment variables on hosting platform
2. Run `npm install --production`
3. Run `npx prisma generate`
4. Start with `npm start`

Recommended platforms: Railway, Render, Heroku
