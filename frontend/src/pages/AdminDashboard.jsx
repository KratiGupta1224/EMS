import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { getEvents, getAllUsers } from '../services/api'; // Assume these functions make API calls
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  function shortenText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength-3) + '...';
  }

  // Fetch all events and all users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getEvents();
        const usersData = await getAllUsers();
        console.log(eventsData);
        setEvents(eventsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='admin-dashboard-container'>
    <div className="admin-dashboard">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          All Events
        </button>
        <button
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          All Users
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'events' ? (
          <div className="events-tab">
            <h2>All Events</h2>
            <table className="events-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                 {events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.name}</td>
                    <td>{shortenText(event.description,50)}</td>
                    <td>{event.date}</td>
                    <td>{event.venue}</td>
                    <td>{event.price > 0?event.price+" Rs":"Free"}</td>
                    <td><Link to={`/events/event-details/${event._id}`}>View</Link></td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
        ) : (
          <div className="users-tab">
            <h2>All Users</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
