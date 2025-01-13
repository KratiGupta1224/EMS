import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import CreateEventPage from './pages/CreateEventPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';

import { AuthProvider } from './context/authContext';
import AdminDashboard from './pages/AdminDashboard';
import MyEvents from './pages/MyEvents';
import UserEvents from './pages/UserEvents';
import EditEventPage from './pages/EditEventPage';
import Events from './components/Events';
import EmailVerification from './pages/EmailVerification';
import Team from './components/Team';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-list" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events/event-details/:eventId" element={<EventDetailsPage />} />
          <Route path="/events/edit/:eventId" element={<EditEventPage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/user-events" element={<UserEvents />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email/:id" element={<EmailVerification />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
