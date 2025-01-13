import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserEvents } from '../services/api';
import './../styles/my-events.css';

const UserEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const loadUserEvents = async () => {
    try {
      const eventsData = await fetchUserEvents();
      if(eventsData)
        setUserEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-events-page">
      <h2>My Events</h2>
      {userEvents.length === 0 ? (
        <p>No events found</p>
      ) : ( 
        <div className="event-list">
          {userEvents.map((event) => (
            <div key={event.eventId._id} className="event-card">
              <h3>{event.eventId.name}</h3>
              <p>Description: {event.eventId.description}</p>
              <p>Date: {new Date(event.eventId.date).toLocaleDateString()}</p>
              <p>Venue: {event.eventId.venue}</p>
              <div className="event-actions">
                <Link className='event-details-btn' to={`/events/event-details/${event.eventId._id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEvents;
