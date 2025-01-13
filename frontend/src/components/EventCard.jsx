import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventCard.css'

function shortenText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength-3) + '...';
}

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3 className='name'>{event.name}</h3>
      <p className='description'>{"Description: " + shortenText(event.description,50)}</p>
      <p className='date'>Date: {new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(event.date))}</p>
      <p className='venue'>Venue: {event.venue}</p>
      <p className='price'>Price: {event.price > 0 ? `${event.price} Rs` : 'Free'}</p>
      <Link to={`/events/event-details/${event._id}`}>View Details</Link>
    </div>
  );
};

export default EventCard;
