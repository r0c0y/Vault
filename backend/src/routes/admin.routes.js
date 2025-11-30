const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

// Protect all admin routes
router.use(adminMiddleware);

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);
router.get('/projects', adminController.getAllProjects);
router.delete('/users/:id', adminController.deleteUser);
router.delete('/projects/:id', adminController.deleteProject);

module.exports = router;
