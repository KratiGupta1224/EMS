import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const data = await loginUser({ email, password });
      console.log(data);
      login(data.token, data.user);
      navigate('/');
    }catch(err){
      alert(err.message);
    }
  };

  return (
    <div className='login-page-container'>
    <div className="login-page">
      <h1 className='login-heading'>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
