import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import '../styles/Events.css'

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showUpcoming, setShowUpcoming] = useState(true); // Toggle state
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  const today = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  // Filter events based on the toggle state
  useEffect(() => {
    if (showUpcoming) {
      const upcomingEvents = events.filter(event => new Date(event.date) > today);
      setFilteredEvents(upcomingEvents);
    } else {
      const pastEvents = events.filter(event => new Date(event.date) <= today);
      setFilteredEvents(pastEvents);
    }
  }, [showUpcoming, events]);

  return (
    <div className='Events-container'>
      <div className="toggle-container">
        <button
          className={`toggle-btn ${showUpcoming ? 'active' : ''}`}
          onClick={() => setShowUpcoming(true)}
        >
          Upcoming Events
        </button>
        <button
          className={`toggle-btn ${!showUpcoming ? 'active' : ''}`}
          onClick={() => setShowUpcoming(false)}
        >
          Past Events
        </button>
      </div>

      {/* Event Cards */}
      <div className="event-list">
        {filteredEvents.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
