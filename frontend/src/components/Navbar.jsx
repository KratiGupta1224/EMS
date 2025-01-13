import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import "./../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar'>
      <h2>Event Management System</h2>
      <ul className='list'>
        <li><Link className='nav-link' to="/">Home</Link></li>
        <li><Link className='nav-link' to="/event-list">Events</Link></li>

        {user && (
          <>
            {user.role === 'Organizer' && <li><Link className='nav-link' to="/create-event">Create Event</Link></li>}
            {(user.role === 'Organizer') && <li><Link className='nav-link' to="/my-events">My Events</Link></li>}
            {(user.role === 'Attendee') && <li><Link className='nav-link' to="/user-events">My Events</Link></li>}
            {user.role === 'Admin' && <li><Link className='nav-link' to="/admin/dashboard">Admin Dashboard</Link></li>}
            <li><Link className='nav-link' to="/profile">Profile</Link></li>
            <li><button className='logout-btn' onClick={handleLogout}>Logout</button></li>
          </>
        )}
        {!user && (
          <>
            <li><Link className='nav-link' to="/register">Register</Link></li>
            <li><Link className='nav-link' to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

