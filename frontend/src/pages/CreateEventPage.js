import React, { useState } from 'react';
import { createEvent } from '../services/api';
import { useNavigate } from 'react-router-dom';
import "./../styles/create-event.css";

const CreateEventPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, description, date, venue, price };
    
    await createEvent(eventData);
    navigate('/');
  };

  return (
    <div className="create-event-page">
      <h1>Create Event</h1>
      <form className='event-form' onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description: <textarea 
                          placeholder="Enter Description Here" 
                          value={description} 
                          onChange={(e) => setDescription(e.target.value)} 
                          rows={10} 
                          cols={50} required />
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
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
