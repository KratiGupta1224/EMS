import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import '../styles/HomePage.css';
import bg from '../assets/ems-bg.jpg';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Team from '../components/Team';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="home-page">
      <img className='home-bg-image' src={bg} />
      <div className='banner-heading'>
        <div>
          <h3>Welcome to EMS</h3>
        </div>
        <hr />
        <div>
          <h3>One stop access to top coding Events, Workshops, contests and hackathons happening worldwide!</h3>
        </div>
      </div>
      <h1 className='upcoming-events-heading'>Upcoming Events</h1>
      <div className="event-list">
        {events.slice(0,4).map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <Link className='view-all-event-btn' to={"/event-list"}>View All Events</Link>
        {/* <Team /> */}
    </div>
  );
};

export default HomePage;
