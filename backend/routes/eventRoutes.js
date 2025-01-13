const express = require('express');
const { createEvent, getEvents, getEventById, getMyEvents, deleteEvent, eventAnalytics, editEvent } = require('../controllers/eventController');
const {authMiddleware} = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware("Organizer"), createEvent);
router.get('/get-events', getEvents);
router.get('/event-details/:id', getEventById);
router.get('/my-events', authMiddleware("Organizer"), getMyEvents);
router.get('/get-event-analytics', authMiddleware("Organizer"), eventAnalytics);
router.delete('/delete-event', authMiddleware("Organizer"), deleteEvent);
router.put('/update-event/:eventId', authMiddleware("Organizer"), editEvent);

module.exports = router;