const express = require('express');
const { register, login } = require('../controllers/authController');
const {sendOtp, validateOtp}  = require('../controllers/emailSender');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', validateOtp);

module.exports = router;