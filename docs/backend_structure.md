# Backend Structure

The backend follows a component-based architecture for controllers to improve maintainability and separation of concerns.

## Directory Structure

```
backend/src/
├── controllers/
│   └── projects/
│       ├── crud.controller.js        # Create, Read (One), Update, Delete
│       ├── feed.controller.js        # Explore, Dashboard, Profile, Match
│       └── interaction.controller.js # Voting, Likes
├── routes/
│   └── project.routes.js             # Unified route definitions
```

## Modules

### 1. CRUD Controller (`crud.controller.js`)
Handles the lifecycle of a single project.
- **Create**: `createProject`
- **Read**: `getProjectById`
- **Update**: `updateProject`
- **Delete**: `deleteProject`

### 2. Feed Controller (`feed.controller.js`)
Handles lists and discovery of projects.
- **Explore**: `getProjects` (Search, Sort, Filter)
- **Dashboard**: `getMyProjects` (User's own projects)
- **Profile**: `getUserProjects` (Public profile)
- **Match**: `getRandomProjects` (Random selection)

### 3. Interaction Controller (`interaction.controller.js`)
Handles user interactions with projects.
- **Vote**: `voteProject`

## Routes
All project-related routes are defined in `backend/src/routes/project.routes.js` and import the necessary functions from the modular controllers.
