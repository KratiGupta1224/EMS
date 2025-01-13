import React, { useState, useEffect } from 'react';
import { getUserById } from '../services/api';  // API functions to get user data   // getUserEvents
// import { useNavigate } from 'react-router-dom';
// import ImageUpload from '../components/ImageUpload'
import {jwtDecode} from 'jwt-decode';
import Analytics from '../components/Analytics';
import '../styles/ProfilePage.css'

export const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Access the 'id' field from the payload
  }
  return null; // Return null if token is not found
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);         // User profile data
  // const [events, setEvents] = useState([]);       // Registered events
  // const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const userId = await getUserId();
        const profileData = await getUserById(userId);  // Assuming token-based auth
        setUser(profileData);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };

    // Fetch registered events
    // const fetchUserEvents = async () => {
    //   try {
    //     const eventsData = await getUserEvents();
    //     setEvents(eventsData);
    //   } catch (err) {
    //     console.error('Failed to fetch events:', err);
    //   }
    // };

    fetchProfile();
    // fetchUserEvents();
  }, []);

  if (!user) {
    return <div>Loading...</div>;  // Show loading indicator until profile is loaded
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
        {/* <ImageUpload /> */}
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>

      </div>
      {user.role === "Organizer"? <Analytics />: ""}

      {/* <div className="registered-events">
        <h2>Your Registered Events</h2>
        {events.length === 0 ? (
          <p>You haven't registered for any events yet.</p>
        ) : (
          <ul>
            {events.map(event => (
              <li key={event._id}>
                {event.name} - {new Date(event.date).toLocaleDateString()}
                <button onClick={() => navigate(`/event/${event._id}`)}>View Details</button>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default ProfilePage;
