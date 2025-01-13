import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EmailVerification.css'; // Custom CSS for OTP inputs
import { verifyOtp } from '../services/api';

const EmailVerification = () => {
  const { id } = useParams();
  const [otp, setOtp] = useState(new Array(6).fill('')); // Array for 6-digit OTP
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (element, index) => {
    if (!/^\d*$/.test(element.value)) return; // Allow only numeric input

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input automatically if available
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(''); // Join OTP array into a string
    console.log(enteredOtp);
    try {
      // Send OTP to the backend for verification
      const response = await verifyOtp(id, enteredOtp);
      if (response.status === 200) {
        navigate('/login'); // Redirect to login if OTP is valid
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              value={value}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()} // Select input on focus
              className="otp-input"
              required
            />
          ))}
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default EmailVerification;
