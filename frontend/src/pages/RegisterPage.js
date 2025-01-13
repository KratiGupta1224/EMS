import React, { useState } from 'react';
import { otpSender, registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Attendee');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };

    // Validate email and password
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
       const response = await registerUser(userData);
       alert("Registration successful!");

       const token = response.token;
       const email = response.user.email;
       const userDataJWT = jwtDecode(token);
       let userId;
      if(userDataJWT) userId = userDataJWT.id;

      await otpSender(email);
      navigate(`/verify-email/${userId}`);

    } catch (err) {
      if (err.response && err.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className='register-page-container'>
      <div className="register-page">
        <h1>Register</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if exists */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Attendee">Attendee</option>
            <option value="Organizer">Organizer</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
