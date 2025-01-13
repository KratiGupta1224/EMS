const Event = require('../models/event');
const Registration = require('../models/registration');

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, venue, price } = req.body;
    const event = new Event({ name, description, date, venue, price, organizer: req.user.id });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventByIdUtil = async (eventId) => {
  // Find the event by ID and populate the organizer details (if needed)
  const event = await Event.findById(eventId).populate('organizer', 'name email');
  // console.log(event);
  return event;
};


exports.getEventById = async (req, res) => {
  const eventId = req.params.id;
  try {
    // Find the event by ID and populate the organizer details (if needed)
    const event = await getEventByIdUtil(eventId); // Populating organizer name and email

    if (!event) {
      return res.status(404).json({ message: 'Event not found' }); // If event doesn't exist, return 404
    }

    // Return event details in JSON format
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const organizerId = req.user.id;
    const events = await Event.find({ organizer: organizerId });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.editEvent = async (req, res) => {
  const { eventId } = req.params;
  const { name, description, date, venue, price } = req.body;

  try {
    // Find the event by ID and update it
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        name,
        description,
        date: new Date(date).toISOString(), // Ensure date is stored as a proper Date object
        venue,
        price,
      },
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error', error });
  }
}


exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.query;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.eventAnalytics = async (req,res) => {
  try{
    const eventAnalyticsData = [];
    const organizerId = req.user.id;
    
    const events = await Event.find({ organizer: organizerId });
    
    for (const event of events) {
      const eventId = event._id.toString();
      const registrations = await Registration.find({ eventId }).populate('userId', 'name email');
      const name = event.name;
      const count = registrations.length;
      const analyticsData = { name: name, value: count };
      eventAnalyticsData.push(analyticsData);
    }
    
    res.status(200).json(eventAnalyticsData);
  }catch(error){
    console.error('Error getting event analytics:', error);
    res.status(500).json({message: "server error"});
  }
}