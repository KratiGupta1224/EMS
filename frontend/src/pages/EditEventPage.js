import React, { useState, useEffect } from 'react';
import { editEvent, getEventById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import "./../styles/create-event.css";
import EventDetailsPage from './EventDetailsPage';

const EditEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const userData = await getEventById(eventId);
        const data = userData.data;
        setEvent(data);
        setName(data.name || '');
        setDescription(data.description || '');
        setDate(data.date.split('T')[0] || '');
        setVenue(data.venue || '');
        setPrice(data.price || 0);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, description, date, venue, price };
    try {
      console.log(eventData)
      const response = await editEvent(eventData, eventId);
      console.log(response);
      navigate(`/my-events`);
    } catch (error) {
      console.error('Error editing event:', error);
      alert('Failed to edit event. Please try again.');
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="create-event-page">
      <h1>Edit Event</h1>
      <form className="event-form" onSubmit={handleEditSubmit}>
        <label>
          Name: <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled required />
        </label>
        <label>
          Description: <textarea
                          placeholder="Enter Description Here"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={10}
                          cols={50}
                          required
                        />
        </label>
        <label>
          Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Venue: <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </label>
        <label>
          Price: <input type="number" placeholder="Price (if paid)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <button type="submit">Edit Event</button>
      </form>
    </div>
  );
};

export default EditEventPage;
