const Registration = require('../models/registration');
const Event = require('../models/event');
const User = require('../models/user');
const mongoose = require('mongoose');

// Register an attendee for an event
const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Event ID from request parameters
    const {userId} = req.body; // Get userId from request body
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new registration
    const registration = new Registration({
      eventId,
      userId
    });

    await registration.save();

    res.status(201).json({
      message: 'Successfully registered for the event!',
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all registrations for an event (Admin/Organizer)
const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from request parameters
    // Find registrations for the event and populate user details
    const registrations = await Registration.find({ eventId }).populate('userId', 'name email');

    // Check if registrations exist
    if (!registrations || registrations.length === 0) {
      return res.status(200).json([]);
    }

    // Return the registrations in the response
    res.status(200).json({registrations});
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


const getRegistrationsByUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    const registrations = await Registration.find({ userId }).populate('eventId');
    if (!registrations) {
      return res.status(404).json({ message: 'No registrations found' });
    }

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error });
  }
};

const isRegisteredInEvent = async (req, res) => {
  try{
    const {eventId} = req.params;
    let isRegistered = false;
    const registrations = await Registration.find({ eventId }).populate('userId', 'name email');
    if (!registrations || registrations.length === 0) {
      return res.status(200).json(isRegistered);
    }
    for(let i = 0;i<registrations.length;i++){
      const userId = registrations[i].userId._id.toString();
        if(userId === req.user.id){
              isRegistered = true;
        }
    }
    return res.status(200).json(isRegistered);

  }catch(error){
    res.status(error.status).json({ message: 'Server error', error: error });
  }
}



module.exports = {
  registerForEvent,
  getRegistrationsByEvent,
  getRegistrationsByUser,
  isRegisteredInEvent
};
