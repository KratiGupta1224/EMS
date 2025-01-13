import axios from 'axios';

axios.defaults.withCredentials = true;



const API = axios.create({ baseURL: 'http://localhost:3030/api' });

export const getEvents = async () => {
  try {
    const response = await API.get('events/get-events');
    return response.data;
  } catch (err) {
    console.error('Error fetching users:', err);
  }
}
export const getEventById = (eventId) => API.get(`/events/event-details/${eventId}`);
export const createEvent = (eventData) => API.post('/events/create', eventData);

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3030/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));


export const getAllUsers = async () => {
  try {
    const response = await API.get('users/get-all-users');
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await API.get(`users/get-user/id/${userId}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching user:', err);
  }
};

export const fetchMyEvents = async () => {
  try {
    const response = await API.get(`/events/my-events`);
    return response.data;
  } catch (err) {
    console.error('Error fetching events:', err);
  }
};

export const editEvent = async (eventData, eventId) => {
  try {
    const response = await API.put(`/events/update-event/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    console.log(eventId);
    await API.delete(`events/delete-event`, { params: { eventId } });
  } catch (err) {
    console.error('Error fetching event:', err);
  }
};

export const handleEventRegistration = async (eventId, userId) => {
  try {
    const response = await API.post(`registration/register-event/${eventId}`, { userId });
    if (response.status === 201) {
      alert('Registration successful!');
    } else {
      alert('Failed to register. Please try again.');
    }
  } catch (err) {
    console.error('Error during registration:', err);
    alert('Error during registration. Please try again.');
  }
};

export const getRegistrationsforEvent = async (eventId) => {
  try {
    const response = await API.get(`/registration/get-for-event/${eventId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    if(err.response.status !== 404){
      alert('Error fetching registered users for event');
    }  
  }
}

export const fetchUserEvents = async () => {
  try {
    const response = await API.get(`/registration/get-registered-events`);
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
}
}

export const isUserRegisteredinEvent = async (eventId) => {
  try {
    const response = await API.get(`/registration/isRegistered/${eventId}`);
    return response;
  } catch (err) {
    if(err.response.status !== 403)
      console.log("User is not attendee!")
  }
}

export const eventAnalytics = async () => {
  try{
    const response = await API.get(`/events/get-event-analytics`);
    return response.data;
  }catch(error){
    console.err(error);
  }
}

export const otpSender = async (email) => {
  try{
    const response = await API.post(`/auth/send-otp`, {email});
    return response;
  }catch(err){
    console.err(err);
  }
}

export const verifyOtp = async (id, otp) => {
  try{
    const response = await API.post(`/auth/verify-otp`, {id, otp});
    console.log(response);
    return response;
  }catch(err){
    console.err(err);
  }
}