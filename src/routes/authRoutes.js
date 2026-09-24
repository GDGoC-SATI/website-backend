import express from 'express';
import {
  signup,
  sendSignupOtp,
  verifySignupOtp,
  login,
  sendLoginOtp,
  verifyLoginOtp,
  sendForgotPasswordOtp,
  resetPasswordWithOtp,
  googleAuth,
  getGoogleClientId,
  getMe,
  updateProfile,
  getUserByUsername,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Direct & OTP Signup
router.post('/signup', signup);
router.post('/send-signup-otp', sendSignupOtp);
router.post('/verify-signup-otp', verifySignupOtp);

// Password & OTP Login
router.post('/login', login);
router.post('/send-login-otp', sendLoginOtp);
router.post('/verify-login-otp', verifyLoginOtp);

// Forgot Password Flow
router.post('/forgot-password/send-otp', sendForgotPasswordOtp);
router.post('/forgot-password/reset', resetPasswordWithOtp);

// Google OAuth & Config
router.post('/google', googleAuth);
router.get('/google-client-id', getGoogleClientId);

// Profile
router.get('/me', protect, getMe);
router.get('/user/:username', getUserByUsername);
router.put('/profile', protect, updateProfile);

export default router;
