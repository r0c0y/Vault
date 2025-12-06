# Security Implementation

## 1. Authentication Security
- **Stateless JWTs:** We do not store session data in the database (scalable).
- **HttpOnly Cookies:** The Refresh Token is stored in a cookie with the `HttpOnly` flag. This means **JavaScript cannot read it**, making it immune to XSS (Cross-Site Scripting) attacks.
- **Short-Lived Access Tokens:** Access tokens expire in 15 minutes. If stolen, they are useless quickly.

## 2. Password Security
- **Bcrypt Hashing:** We NEVER store plain-text passwords.
- We use `bcryptjs` with a salt round of 10. Even if the DB is leaked, passwords are unreadable.

## 3. API Security
- **CORS (Cross-Origin Resource Sharing):**
    - We strictly whitelist origins: `localhost:3000` and our Vercel domain.
    - This prevents malicious sites from making requests to our backend.
- **Environment Variables:**
    - Secrets (DB URL, JWT Secrets, Admin Keys) are stored in `.env`.
    - `.env` is **gitignored**, so secrets are never committed to GitHub.

## 4. Ghost Mode (Admin Security)
- **Hidden Route:** The admin dashboard is not linked anywhere. You must know the URL.
- **Secret Header:** Admin API endpoints do NOT use user tokens. They require a specific `x-admin-secret` header.
- **Server-Side Check:** The backend validates this secret against the environment variable. It is impossible to bypass from the client side.

