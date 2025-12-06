# Case Study: Life of a Request

This document traces the exact flow of data for key user actions.

## Flow 1: User Signup
**Goal:** A new user registers an account.

1.  **Frontend (User Action):**
    - User fills form on `/signup`.
    - `handleSubmit` calls `axios.post('/api/auth/signup', { name, email, password })`.
2.  **Backend (Route Handler):**
    - Request hits `routes/auth.routes.js`.
    - Routed to `controllers/auth.controller.js` -> `signup` function.
3.  **Backend (Logic):**
    - Check if email exists in DB (Prisma).
    - **Hash Password:** `bcrypt.hash(password, 10)`.
    - **Create User:** `prisma.user.create({ ... })`.
    - **Generate Tokens:** Create Access Token (JWT) and Refresh Token.
4.  **Backend (Response):**
    - Set Refresh Token as **HttpOnly Cookie** (Secure).
    - Send Access Token & User Data as JSON response.
5.  **Frontend (Completion):**
    - `AuthContext` receives user data.
    - Updates global state `user`.
    - Redirects to `/explore`.

## Flow 2: Creating a Project
**Goal:** A logged-in user posts a new project.

1.  **Frontend:**
    - User clicks "Share Project".
    - Fills details (Title, Tech Stack, Images).
    - `axios.post('/api/projects', data, { headers: { Authorization: Bearer TOKEN } })`.
2.  **Backend (Middleware):**
    - `authenticateToken` middleware intercepts request.
    - Verifies JWT. If valid, attaches `req.user`.
3.  **Backend (Controller):**
    - `project.controller.js` -> `createProject`.
    - Validates input.
    - `prisma.project.create({ data: { ..., userId: req.user.id } })`.
4.  **Database:**
    - MongoDB stores the project and links it to the User ID.

## Flow 3: God Mode (Admin Action)
**Goal:** Admin bans a user.

1.  **Frontend (Ghost Dashboard):**
    - Admin clicks "Ban" on `/ghost-x9z2`.
    - `axios.put('/api/admin/users/:id/ban', {}, { headers: { 'x-admin-secret': SECRET } })`.
2.  **Backend (Middleware):**
    - `admin.middleware.js` checks `req.headers['x-admin-secret']`.
    - Compares with `process.env.ADMIN_SECRET`.
    - If match, allows request.
3.  **Backend (Controller):**
    - `admin.controller.js` -> `toggleBanUser`.
    - `prisma.user.update({ where: { id }, data: { isBanned: true } })`.

