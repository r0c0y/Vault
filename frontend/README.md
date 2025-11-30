# Vault Frontend - Authentication UI

Clean, modern authentication interface built with Next.js, React, and TailwindCSS.

---

## 🏗️ Architecture

```
frontend/
├── pages/
│   ├── _app.js              # App wrapper with AuthProvider
│   ├── index.js             # Home (redirects to login)
│   ├── signup.jsx           # Signup page
│   ├── login.jsx            # Login page
│   └── dashboard.jsx        # Protected dashboard
├── lib/
│   ├── api.js               # Axios instance & refresh helper
│   └── AuthContext.js       # Auth state management
├── styles/
│   └── globals.css          # Tailwind CSS
├── .env.example             # Environment variables template
└── package.json
```

---

## 🔧 Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS 3
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Routing**: Next.js Router

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 📄 Pages

### 1. Home (`/`)

- Auto-redirects to `/login`
- Entry point for the application

### 2. Signup (`/signup`)

- User registration form
- Fields: Name, Email, Password
- On success: redirects to `/dashboard`
- Sets refresh token cookie
- Stores access token in memory

### 3. Login (`/login`)

- User authentication form
- Fields: Email, Password
- On success: redirects to `/dashboard`
- Sets refresh token cookie
- Stores access token in memory

### 4. Dashboard (`/dashboard`)

- Protected route (requires authentication)
- Displays user info
- "Call /me" button to test protected API
- Logout button
- Auto-redirects to `/login` if not authenticated

---

## 🔐 Authentication Flow

### Initial Load

```
App loads → AuthProvider mounts
           ↓
Try POST /api/auth/refresh (with cookie)
           ↓
If success: Set accessToken & user in state
If fail: User stays logged out
           ↓
Render pages
```

### Signup Flow

```
User fills form → Submit
                 ↓
POST /api/auth/signup
                 ↓
Response: { accessToken, user }
Cookie: refreshToken (HTTP-only)
                 ↓
Store in AuthContext state
                 ↓
Redirect to /dashboard
```

### Login Flow

```
User fills form → Submit
                 ↓
POST /api/auth/login
                 ↓
Response: { accessToken, user }
Cookie: refreshToken (HTTP-only)
                 ↓
Store in AuthContext state
                 ↓
Redirect to /dashboard
```

### Protected API Call

```
User clicks "Call /me"
                 ↓
authFetch('/api/auth/me')
                 ↓
Add Authorization: Bearer <accessToken>
                 ↓
If 401: Try refresh → Retry with new token
If success: Show response
```

### Logout Flow

```
User clicks Logout
                 ↓
POST /api/auth/logout
                 ↓
Clear accessToken & user from state
                 ↓
Redirect to /login
```

---

## 🧩 Components & Utilities

### AuthContext (`lib/AuthContext.js`)

**State:**

- `accessToken` - JWT access token (stored in memory)
- `user` - User object `{ id, name, email }`
- `loading` - Initial loading state

**Methods:**

- `login(email, password)` - Authenticate user
- `signup(name, email, password)` - Register user
- `logout()` - Clear session
- `authFetch(url, options)` - Call protected endpoints with auto-refresh

**Auto-Refresh:**

- On mount, tries to refresh using HTTP-only cookie
- If successful, user stays logged in across page refreshes

### API Client (`lib/api.js`)

**Axios Instance:**

```javascript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Sends cookies
});
```

**Refresh Helper:**

```javascript
export async function refreshToken() {
  const res = await api.post("/api/auth/refresh");
  return res.data; // { accessToken, user }
}
```

---

## 🎨 Styling

### TailwindCSS Configuration

**`tailwind.config.js`:**

```javascript
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**`styles/globals.css`:**

- Tailwind directives
- Base styles
- Full-height layout

### Design System

**Colors:**

- Background: `slate-50`
- Text: `slate-800`, `slate-600`
- Primary: `slate-800`
- Error: `red-600`

**Components:**

- Forms: White cards with shadow
- Inputs: Border with rounded corners
- Buttons: Full-width, rounded, with hover states

---

## 🔒 Security Features

- ✅ **Access Token in Memory**: Not stored in localStorage (XSS protection)
- ✅ **Refresh Token in HTTP-only Cookie**: Not accessible via JavaScript
- ✅ **Auto-Refresh**: Seamless token renewal
- ✅ **Protected Routes**: Redirect to login if not authenticated
- ✅ **CORS with Credentials**: Secure cross-origin requests
- ✅ **Error Handling**: User-friendly error messages

---

## 🧪 Testing

### Manual Testing

1. **Signup Flow:**

   ```
   1. Go to http://localhost:3000/signup
   2. Fill: Name, Email, Password
   3. Submit
   4. Should redirect to /dashboard
   5. Check DevTools → Application → Cookies → refreshToken exists
   ```

2. **Login Flow:**

   ```
   1. Logout from dashboard
   2. Go to /login
   3. Enter credentials
   4. Submit
   5. Should redirect to /dashboard
   ```

3. **Protected Route:**

   ```
   1. While logged in, note dashboard URL
   2. Open DevTools → Application → Cookies
   3. Delete refreshToken cookie
   4. Refresh page
   5. Should redirect to /login
   ```

4. **Auto-Refresh:**

   ```
   1. Login successfully
   2. Stay on dashboard
   3. Refresh browser (F5)
   4. Should stay on dashboard (proves auto-login works)
   ```

5. **Call Protected API:**
   ```
   1. On dashboard, click "Call /me"
   2. Should show alert with user data
   3. No 401 errors
   ```

### Browser DevTools Checks

**Network Tab:**

- POST `/api/auth/signup` → 201, Set-Cookie header
- POST `/api/auth/login` → 200, Set-Cookie header
- POST `/api/auth/refresh` → 200, new Set-Cookie
- GET `/api/auth/me` → 200, Authorization header present

**Application Tab:**

- Cookies → `refreshToken` exists
- HttpOnly: ✅
- Secure: ✅ (in production)
- SameSite: None or Lax

**Console Tab:**

- No CORS errors
- No authentication errors

---

## 🚀 Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Vault frontend"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click "Add New..." → "Project"
3. Import your repository
4. Set Root Directory: `frontend` (if in monorepo)

### Step 3: Configure Environment

Add environment variable:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.onrender.com
```

### Step 4: Deploy

- Click "Deploy"
- Wait 1-3 minutes
- Get URL: `https://vault-frontend.vercel.app`

### Step 5: Update Backend

Update backend `FRONTEND_URL` env variable to your Vercel URL.

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Symptom:** "CORS policy" error in console

**Fix:**

- Verify backend `FRONTEND_URL` matches Vercel URL exactly
- Ensure `withCredentials: true` in `lib/api.js`
- Check backend CORS config allows credentials

### Issue: Cookies Not Set

**Symptom:** Login works but refresh doesn't

**Fix:**

- Verify backend uses HTTPS (Vercel always uses HTTPS)
- Check backend `NODE_ENV=production`
- Ensure `sameSite: 'none'` and `secure: true` in backend

### Issue: Redirect Loop

**Symptom:** Keeps redirecting between login and dashboard

**Fix:**

- Check AuthContext loading state
- Verify refresh endpoint returns proper response
- Clear browser cookies and try again

### Issue: Build Failed

**Symptom:** Vercel build fails

**Fix:**

- Ensure all dependencies in `package.json`
- Check for syntax errors
- Verify Next.js version compatibility

---

## 📁 File Descriptions

### Pages

**`pages/_app.js`**

- Wraps entire app with `AuthProvider`
- Imports global CSS
- Provides auth context to all pages

**`pages/index.js`**

- Home page
- Redirects to `/login`

**`pages/signup.jsx`**

- Signup form
- Calls `signup()` from AuthContext
- Error handling
- Redirects to dashboard on success

**`pages/login.jsx`**

- Login form
- Calls `login()` from AuthContext
- Error handling
- Redirects to dashboard on success

**`pages/dashboard.jsx`**

- Protected route
- Shows user info
- Test button for protected API
- Logout button
- Auto-redirects if not authenticated

### Libraries

**`lib/AuthContext.js`**

- React Context for auth state
- Manages accessToken & user
- Provides login/signup/logout methods
- Auto-refresh on mount
- `authFetch` helper with auto-retry

**`lib/api.js`**

- Axios instance with credentials
- Base URL from env variable
- `refreshToken()` helper function

---

## 🔄 Future Enhancements (Vault Platform)

This frontend is designed to scale. Future additions:

### New Pages

- `/projects` - List all projects
- `/projects/[id]` - Project details
- `/projects/new` - Create project
- `/tasks` - Task management
- `/collab` - Collaboration invites
- `/portfolio` - Public portfolio view
- `/profile` - User profile settings

### New Components

- `ProjectCard` - Display project info
- `TaskList` - Task management UI
- `CollabInvite` - Invite team members
- `Navbar` - Navigation bar
- `Sidebar` - Dashboard sidebar

### New Features

- Project CRUD operations
- Task tracking
- Team collaboration
- Search & filter
- Analytics dashboard
- AI tag generator integration

---

## 📝 Environment Variables

| Variable                  | Description     | Example                 |
| ------------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL | `http://localhost:4000` |

Note: `NEXT_PUBLIC_` prefix makes variable available in browser.

---

## 📚 Dependencies

### Production

- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM renderer
- `axios` - HTTP client

### Development

- `tailwindcss` - Utility-first CSS
- `postcss` - CSS processor
- `autoprefixer` - CSS vendor prefixes

---

## 👨‍💻 Author

**Priyanshu**  
Frontend authentication UI for Vault platform

---

## 📄 License

MIT - Built for educational and portfolio purposes
