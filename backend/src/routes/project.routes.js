const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Protected routes
router.post('/', authMiddleware, projectController.createProject);
router.get('/user/me', authMiddleware, projectController.getMyProjects); // Dashboard (Must be before /user/:userId)
router.get('/match', authMiddleware, projectController.getRandomProjects); // Match feature
router.post('/:id/vote', authMiddleware, projectController.voteProject); // Vote feature
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

// Public routes
router.get('/', projectController.getProjects); // Explore feed
router.get('/:id', projectController.getProjectById);
router.get('/user/:userId', projectController.getUserProjects); // Public profile projects

module.exports = router;
