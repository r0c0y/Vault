# Frontend Structure

The frontend API layer has been refactored to use a modular structure, mirroring the backend's component-based approach.

## Directory Structure

```
frontend/
├── lib/
│   ├── api/
│   │   ├── client.js    # Axios instance configuration
│   │   ├── auth.js      # Authentication endpoints
│   │   ├── projects.js  # Project-related endpoints
│   │   ├── users.js     # User-related endpoints
│   │   └── index.js     # Barrel file exporting all API functions
│   └── api.js           # Main entry point (re-exports from api/index.js)
├── components/
│   ├── shared/          # Generic reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Pagination.jsx
│   └── projects/        # Project-specific components
│       ├── ProjectCard.jsx
│       ├── DashboardProjectCard.jsx
│       ├── ProjectFilters.jsx
│       └── TechStackInput.jsx
```

## Modules

### 1. Client (`client.js`)
Configures the Axios instance with base URL and credentials.

### 2. Auth (`auth.js`)
Handles user authentication.
- `login`, `signup`, `logout`
- `getProfile`, `refreshToken`

### 3. Projects (`projects.js`)
Handles project operations.
- **CRUD**: `createProject`, `getProjectById`, `updateProject`, `deleteProject`
- **Feed**: `getProjects`, `getMyProjects`, `getUserProjects`, `getRandomProjects`
- **Interaction**: `voteProject`

### 4. Users (`users.js`)
Handles user profile and social interactions.
- `getUserProfile`, `updateProfile`
- `followUser`, `unfollowUser`

## Usage
You can continue to import from `frontend/lib/api` as before, or import specific modules if needed.

```javascript
import { getProjects } from '../lib/api';
// OR
import { getProjects } from '../lib/api/projects';
```
