import express from 'express';
import { authController } from '../controller/authController.js';
// import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout',authMiddleware, authController.logout); // Protected route

export default router;