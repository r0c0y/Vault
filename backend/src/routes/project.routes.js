const express = require('express');
const router = express.Router();
const crudController = require('../controllers/projects/crud.controller');
const feedController = require('../controllers/projects/feed.controller');
const interactionController = require('../controllers/projects/interaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Protected routes
router.post('/', authMiddleware, crudController.createProject);
router.get('/user/me', authMiddleware, feedController.getMyProjects); // Dashboard (Must be before /user/:userId)
router.get('/match', authMiddleware, feedController.getRandomProjects); // Match feature
router.post('/:id/vote', authMiddleware, interactionController.voteProject); // Vote feature
router.put('/:id', authMiddleware, crudController.updateProject);
router.delete('/:id', authMiddleware, crudController.deleteProject);

// Public routes
router.get('/', feedController.getProjects); // Explore feed
router.get('/:id', crudController.getProjectById);
router.get('/user/:userId', feedController.getUserProjects); // Public profile projects

module.exports = router;
