const express = require('express');
const {getAllUsers, getUserById, getUserByEmail} = require('../controllers/userController')
// const {authMiddleware} = require('../middleware/authMiddleware'); // Your authentication middleware
const router = express.Router();

router.get('/get-all-users', getAllUsers);
router.get('/get-user/id/:id', getUserById);
router.get('/get-user/email',getUserByEmail);

module.exports = router;