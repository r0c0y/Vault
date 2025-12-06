# Libraries & Dependencies

## Frontend (Client-Side)

### Core
- **`next`**: The React Framework. Handles routing, SSR, and build optimization.
- **`react` / `react-dom`**: The UI library for building components.

### Utilities
- **`axios`**: Promise-based HTTP client. Used to make API requests to our backend.
- **`lucide-react`**: Icon library. Provides the clean, modern SVG icons used throughout the UI.
- **`framer-motion`**: Animation library. Powers the smooth transitions and hover effects.
- **`clsx` / `tailwind-merge`**: Helper utilities to conditionally combine CSS classes (often used with Tailwind).

### Styling
- **`tailwindcss`**: Utility-first CSS framework. Allows us to style components rapidly directly in the JSX.
- **`postcss` / `autoprefixer`**: Tools to process CSS and ensure browser compatibility.

---

## Backend (Server-Side)

### Core
- **`express`**: Fast, unopinionated web framework for Node.js. Handles our API routing and middleware.
- **`cors`**: Middleware to enable Cross-Origin Resource Sharing (allows our Frontend to talk to our Backend).
- **`cookie-parser`**: Middleware to parse cookies from incoming requests (essential for our Refresh Token flow).

### Database
- **`prisma`**: Next-generation ORM.
- **`@prisma/client`**: Auto-generated query builder that lets us write type-safe DB queries in JavaScript.

### Authentication
- **`jsonwebtoken`**: Used to sign and verify JWTs (Access & Refresh tokens).
- **`bcryptjs`**: Used to hash passwords before saving them to the DB (Security best practice).

### Development
- **`nodemon`**: Utility that automatically restarts the node server when file changes are detected.

