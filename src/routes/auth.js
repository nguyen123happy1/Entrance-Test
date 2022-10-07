import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/refresh-token', authController.refreshToken);

router.post('/sign-out', authController.signOut);

export default router;
