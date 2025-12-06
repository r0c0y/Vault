# System Architecture

## Overview
Vault is a full-stack web application designed to connect developers and showcase their projects. It follows a modern **Client-Server Architecture** where the frontend and backend are decoupled services communicating via a RESTful API.

## Tech Stack
- **Frontend:** Next.js (React Framework)
- **Backend:** Node.js with Express
- **Database:** MongoDB (NoSQL)
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)

## Folder Structure

### Root Directory
- `frontend/`: Contains the Next.js client application.
- `backend/`: Contains the Express server application.
- `docs/`: (This folder) Comprehensive project documentation.

### Frontend Structure (`frontend/`)
- **`pages/`**: Next.js file-based routing.
    - `index.jsx`: Landing page.
    - `explore.jsx`: Project discovery page.
    - `match.jsx`: "Tinder-style" project voting.
- **`components/`**: Reusable UI components.
    - `Navbar.jsx`: Responsive navigation.
    - `Card.jsx`: Project display card.
    - `Layout.jsx`: Wrapper for consistent page structure.
- **`lib/`**: Utility functions.
    - `api.js`: Axios instance configuration.
- **`context/`**: Global state management.
    - `AuthContext.js`: Manages user login state.

### Backend Structure (`backend/`)
- **`src/`**: Source code.
    - **`app.js`**: Main application entry point, middleware setup.
    - **`server.js`**: Server startup script.
    - **`controllers/`**: Business logic (handle requests, talk to DB).
        - `auth.controller.js`: Login/Signup logic.
        - `project.controller.js`: CRUD for projects.
    - **`routes/`**: API endpoint definitions.
    - **`middleware/`**: Request processing (Auth checks).
    - **`prisma/`**: Database schema definition (`schema.prisma`).

## Design Patterns

### 1. MVC (Model-View-Controller) - *Backend*
We use a variation of MVC suitable for APIs:
- **Model:** Defined in `prisma/schema.prisma` (User, Project).
- **View:** JSON responses sent to the client.
- **Controller:** Functions in `src/controllers/` that process logic.

### 2. Component-Based Architecture - *Frontend*
The UI is broken down into small, reusable pieces (Components) that can be composed to build complex pages. This promotes reusability and maintainability.

### 3. Service-Oriented Architecture (SOA) - *Deployment*
- **Frontend Service:** Deployed on Vercel (Optimized for static/SSR).
- **Backend Service:** Deployed on Render (Optimized for long-running Node processes).
- **Database Service:** Hosted on MongoDB Atlas.

