# Vault Backend - Authentication Service

Production-ready authentication backend with JWT access/refresh tokens, MongoDB, and Prisma ORM.

---

## 🏗️ Architecture

```
backend/
├── src/
│   ├── server.js              # Entry point
│   ├── app.js                 # Express app configuration
│   ├── prismaClient.js        # Prisma client instance
│   ├── controllers/
│   │   └── auth.controller.js # Auth business logic
│   ├── routes/
│   │   └── auth.routes.js     # API route definitions
│   ├── middlewares/
│   │   └── auth.middleware.js # JWT verification middleware
│   └── utils/
│       ├── jwt.js             # JWT sign/verify helpers
│       └── sendCookie.js      # Cookie configuration
├── prisma/
│   └── schema.prisma          # Database schema
├── .env.example               # Environment variables template
└── package.json
```

---

## 🔧 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Cookie Parsing**: cookie-parser
- **CORS**: cors

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=4000
NODE_ENV=development
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/vaultdb"
JWT_ACCESS_SECRET="your_32_char_secret_here"
JWT_REFRESH_SECRET="your_32_char_secret_here"
ACCESS_TOKEN_EXPIRES="15m"
REFRESH_TOKEN_EXPIRES="7d"
FRONTEND_URL="http://localhost:3000"
```

**Generate secure secrets:**

```bash
openssl rand -hex 32
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:4000`

---

## 🗄️ Database Schema

```prisma
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  name         String
  email        String   @unique
  password     String   // bcrypt hashed
  refreshToken String?  // JWT refresh token
  createdAt    DateTime @default(now())
}
```

---

## 🔌 API Endpoints

### Base URL

```
http://localhost:4000/api/auth
```

### 1. Health Check

```http
GET /
```

**Response:**

```json
{
  "message": "Auth service up",
  "timestamp": "2025-11-18T10:30:00.000Z"
}
```

---

### 2. Signup

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201):**

```json
{
  "message": "User created successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Sets Cookie:**

```
Set-Cookie: refreshToken=<jwt>; HttpOnly; Secure; SameSite=None; Max-Age=604800
```

**Error Responses:**

- `400` - Missing required fields
- `409` - Email already in use
- `500` - Server error

---

### 3. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200):**

```json
{
  "message": "Logged in successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Sets Cookie:** (same as signup)

**Error Responses:**

- `400` - Missing required fields
- `401` - Invalid credentials
- `500` - Server error

---

### 4. Refresh Token

```http
POST /api/auth/refresh
Cookie: refreshToken=<jwt>
```

**Success Response (200):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Sets New Cookie:** (rotated refresh token)

**Error Responses:**

- `401` - No refresh token / Invalid token / Invalid session
- `500` - Server error

---

### 5. Get Current User (Protected)

```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

**Success Response (200):**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-11-18T10:00:00.000Z"
}
```

**Error Responses:**

- `401` - No token / Invalid token
- `404` - User not found
- `500` - Server error

---

### 6. Logout

```http
POST /api/auth/logout
Cookie: refreshToken=<jwt>
```

**Success Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

**Clears Cookie & DB Token**

---

## 🔐 Authentication Flow

### 1. Signup/Login Flow

```
Client → POST /signup or /login
         ↓
Server → Validate credentials
         ↓
Server → Generate access token (15min) + refresh token (7d)
         ↓
Server → Store refresh token in DB
         ↓
Server → Send access token in response body
         ↓
Server → Send refresh token in HTTP-only cookie
         ↓
Client → Store access token in memory (React state)
```

### 2. Protected Request Flow

```
Client → GET /me with Authorization: Bearer <accessToken>
         ↓
Middleware → Verify access token
         ↓
Controller → Return user data
```

### 3. Token Refresh Flow

```
Client → POST /refresh with cookie
         ↓
Server → Verify refresh token from cookie
         ↓
Server → Check token matches DB
         ↓
Server → Generate new access + refresh tokens
         ↓
Server → Update DB with new refresh token
         ↓
Server → Send new tokens to client
```

### 4. Logout Flow

```
Client → POST /logout with cookie
         ↓
Server → Clear refresh token from DB
         ↓
Server → Clear cookie
         ↓
Client → Clear access token from memory
```

---

## 🛡️ Security Features

- ✅ **Password Hashing**: bcrypt with 10 salt rounds
- ✅ **JWT Tokens**: Signed with HS256 algorithm
- ✅ **HTTP-only Cookies**: Refresh token not accessible via JavaScript
- ✅ **Secure Cookies**: HTTPS-only in production
- ✅ **SameSite**: CSRF protection
- ✅ **Token Rotation**: Refresh tokens rotated on use
- ✅ **Token Expiry**: Access tokens expire in 15 minutes
- ✅ **DB Validation**: Refresh tokens validated against database
- ✅ **CORS**: Restricted to frontend origin

---

## 🧪 Testing

See [TESTING.md](../TESTING.md) for complete testing guide.

**Quick Test:**

```bash
# Health check
curl http://localhost:4000/

# Signup
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test@123"}'
```

---

## 🚀 Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for complete deployment guide.

**Quick Deploy to Render:**

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Deploy!

---

## 📁 File Descriptions

### Core Files

**`src/server.js`**

- Entry point
- Starts Express server
- Loads environment variables

**`src/app.js`**

- Express app configuration
- Middleware setup (CORS, JSON, cookies)
- Route mounting
- Health check endpoint

**`src/prismaClient.js`**

- Prisma client singleton
- Database connection

### Controllers

**`src/controllers/auth.controller.js`**

- `signup`: Create new user
- `login`: Authenticate user
- `refresh`: Generate new tokens
- `logout`: Clear session
- `me`: Get current user info

### Routes

**`src/routes/auth.routes.js`**

- Maps HTTP methods to controller functions
- Applies middleware to protected routes

### Middleware

**`src/middlewares/auth.middleware.js`**

- Extracts JWT from Authorization header
- Verifies token signature
- Attaches user payload to request

### Utils

**`src/utils/jwt.js`**

- `signAccessToken`: Create access token
- `signRefreshToken`: Create refresh token
- `verifyToken`: Verify and decode token

**`src/utils/sendCookie.js`**

- Configures cookie options based on environment
- Sets HTTP-only, Secure, SameSite attributes

---

## 🔄 Future Enhancements (Vault Platform)

This auth system is designed to scale. Future additions:

### Database Models

```prisma
model Project {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  ownerId     String   @db.ObjectId
  owner       User     @relation(fields: [ownerId], references: [id])
  tasks       Task[]
  createdAt   DateTime @default(now())
}

model Task {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  status    String
  projectId String   @db.ObjectId
  project   Project  @relation(fields: [projectId], references: [id])
}
```

### New Endpoints

- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `POST /api/tasks` - Create task
- `POST /api/collab/invite` - Invite collaborator

---

## 🐛 Troubleshooting

### Issue: Prisma Client Not Generated

```bash
npx prisma generate
```

### Issue: MongoDB Connection Failed

- Check `DATABASE_URL` format
- Verify MongoDB Atlas network access (0.0.0.0/0)
- Confirm database user credentials

### Issue: JWT Verification Failed

- Ensure `JWT_ACCESS_SECRET` matches between sign and verify
- Check token hasn't expired
- Verify token format: `Bearer <token>`

### Issue: Cookies Not Set

- Check `NODE_ENV` is set correctly
- Verify `FRONTEND_URL` matches client origin
- Ensure HTTPS in production

---

## 📝 Environment Variables Reference

| Variable                | Description               | Example                       |
| ----------------------- | ------------------------- | ----------------------------- |
| `PORT`                  | Server port               | `4000`                        |
| `NODE_ENV`              | Environment               | `development` or `production` |
| `DATABASE_URL`          | MongoDB connection string | `mongodb+srv://...`           |
| `JWT_ACCESS_SECRET`     | Access token secret       | 32+ char string               |
| `JWT_REFRESH_SECRET`    | Refresh token secret      | 32+ char string               |
| `ACCESS_TOKEN_EXPIRES`  | Access token TTL          | `15m`                         |
| `REFRESH_TOKEN_EXPIRES` | Refresh token TTL         | `7d`                          |
| `FRONTEND_URL`          | Frontend origin for CORS  | `http://localhost:3000`       |

---

## 📚 Dependencies

### Production

- `@prisma/client` - Database ORM
- `bcryptjs` - Password hashing
- `cookie-parser` - Parse cookies
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `express` - Web framework
- `jsonwebtoken` - JWT creation/verification

### Development

- `nodemon` - Auto-restart on changes
- `prisma` - Database toolkit

---

## 👨‍💻 Author

**Priyanshu**  
Backend authentication system for Vault platform

---

## 📄 License

MIT - Built for educational and portfolio purposes
