import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyEvents, deleteEvent } from '../services/api';
import './../styles/my-events.css';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const loadEvents = async () => {
    try {
      const eventsData = await fetchMyEvents();
      if(eventsData)
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId) => {
    
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(eventId);
        loadEvents(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  // Handle edit event
//   const handleEdit = (eventId) => {
//     navigate(`/events/edit/${eventId}`);
//   };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="my-events-page">
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : ( 
        <div className="event-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>Description: {event.description}</p>
              <p>Date: {new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(event.date))}</p>
              <p>Venue: {event.venue}</p>
              <div className="event-actions">
               <div className='flex'>
                  <Link className='edit-btn' to={`/events/edit/${event._id}`}>Edit</Link>
                  <button className='delete-btn' onClick={() => handleDelete(event._id)}>Delete</button>
               </div>
                <Link className='event-details-btn' to={`/events/event-details/${event._id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
