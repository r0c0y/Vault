# Core Concepts Explained

## 1. Authentication & Security
We use **JWT (JSON Web Tokens)** for stateless authentication.
- **Access Token:** Short-lived (15 mins). Used to access protected routes.
- **Refresh Token:** Long-lived (7 days). Stored in an **HttpOnly Cookie** (secure, inaccessible to JS) to obtain new access tokens.
- **Why?** This is the industry standard for secure, scalable auth. It prevents XSS attacks (since the refresh token is in an HttpOnly cookie) and CSRF attacks (via SameSite policies).

## 2. RESTful API Design
Our API follows REST (Representational State Transfer) principles:
- **Resources:** Users, Projects.
- **HTTP Methods:**
    - `GET`: Retrieve data (e.g., `GET /api/projects`).
    - `POST`: Create data (e.g., `POST /api/auth/signup`).
    - `PUT`: Update data (e.g., `PUT /api/projects/:id`).
    - `DELETE`: Remove data (e.g., `DELETE /api/users/:id`).
- **Stateless:** Each request contains all necessary info (the Token).

## 3. Database & ORM (Prisma)
We use **MongoDB** (NoSQL) but interact with it using **Prisma** (ORM).
- **Why Prisma?** It gives us type safety and a schema (`schema.prisma`) even though MongoDB is schema-less.
- **Relations:** We define relations like `User hasMany Projects` in the schema, and Prisma handles the complex linking logic for us.

## 4. React Hooks (Frontend Logic)
- **`useState`**: To store local data (e.g., form inputs, toggle states).
- **`useEffect`**: To run side-effects (e.g., fetching data when the page loads).
- **`useContext`**: To share global state (like `user` login status) across the entire app without passing props down manually.

## 5. Ghost Mode (Security by Obscurity + Strong Auth)
Our Admin Dashboard uses a dual-layer security model:
1.  **Obscurity:** The URL is a random string (`/ghost-x9z2`) known only to admins.
2.  **Strong Auth:** Access requires a high-entropy `ADMIN_SECRET` key, validated by backend middleware.

