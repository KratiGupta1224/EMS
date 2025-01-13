const express = require('express');
const { registerForEvent, getRegistrationsByEvent, getRegistrationsByUser,isRegisteredInEvent } = require('../controllers/registrationController');
const {authMiddleware,authMiddlewareWithoutRole} = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for registering for an event
router.post('/register-event/:eventId', registerForEvent); // Protected route, only logged-in users can register

// Route for getting all registrations for a particular event (Admin/Organizer)
router.get('/get-for-event/:eventId', getRegistrationsByEvent); // Admin/Organizer can view all registrations

// Route for getting all registrations of a particular user (Attendee)
router.get('/get-registered-events', authMiddlewareWithoutRole(), getRegistrationsByUser);

router.get('/isRegistered/:eventId', authMiddlewareWithoutRole(), isRegisteredInEvent); 

module.exports = router;