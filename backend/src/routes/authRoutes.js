const express = require('express');
const authController = require('../controllers/authController');
const { authVerify } = require('../middleware/middleware');
const { uploadFields } = require('../services/authService');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/create-password', authController.createNewPassword);
router.post('/resend-otp', authController.resendOtp);
router.post('/update-profile', authVerify,uploadFields, authController.updateProfile);

module.exports = router;
