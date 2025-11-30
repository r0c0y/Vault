const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);
router.get('/users/:id', authController.getUserProfile);
router.post('/users/:id/follow', authMiddleware, authController.followUser);
router.delete('/users/:id/follow', authMiddleware, authController.unfollowUser);
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;
