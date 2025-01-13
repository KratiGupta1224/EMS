import React, { useContext, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { getEventById, handleEventRegistration, getRegistrationsforEvent,isUserRegisteredinEvent} from '../services/api';
import {jwtDecode} from 'jwt-decode';
import { AuthContext } from '../context/authContext';
import '../styles/EventDetailsPage.css';
  
  const token = localStorage.getItem('token');
  let userData;
  if (token) userData = jwtDecode(token);
  let userId;
  if(userData) userId = userData.id;

  const today = new Date();
  const EventDetailsPage = () => {
  const { eventId } = useParams();
  const {user} = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [data, setData] = useState([])
  const [count, setCount] = useState(0);
  const [isRegistered, setIsRegistered] = useState(false);
  const decodedUser = user;

  useEffect(() => {
    const fetchEvent = async () => {
      const userData = await getEventById(eventId);
      const data = userData.data;
      
      setEvent(data);
    };
    fetchEvent();
  }, [eventId]);

  const handleRegister = () => {
    console.log("Decoded USer: ",decodedUser, userData);
    handleEventRegistration(event._id, userId);
  };

    const getRegisteredUsersByEvent = async (eventId) => {
      const data = await getRegistrationsforEvent(eventId);
      
      if(data){
        if(Array.isArray(data)){
          console.log("data: " + data)
          setData(data);
          setCount(data.length);
        }else if(typeof(data) === "object"){
          console.log("data.registrations: " + data.registrations);
          setData(data.registrations)
          setCount(data.registrations.length);
        }
      }else{
        setCount(0);
      } 
    };

    useEffect(() => {
      const checkIsRegistered = async () => {
        const isRegistered = await isUserRegisteredinEvent(eventId);
        if(isRegistered) setIsRegistered(isRegistered.data);
      }
      checkIsRegistered();
    },[isRegistered,eventId]);
  

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-page">
      <h1>{event.name}</h1>
      <p>Description: {event.description}</p>
      <p>Date: {new Intl.DateTimeFormat('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(event.date))}</p>
      <p>Venue: {event.venue}</p>
      <p>Price: {event.price > 0 ? `${event.price} Rs` : 'Free'}</p>
      <div>
       {
        decodedUser?(
          decodedUser.role === "Organizer"?
          <div className='registration-details-section'>
              <button className='updateRegistrationCount' onClick={() => getRegisteredUsersByEvent(event._id)}>
                Get Registration Details 
              </button>
              <p>Registration Count: {count}</p>
            <div className="registered-users-section">
              <h2 className="registered-users-title">Registered Users</h2>
              <table className="registered-users-table">
                <thead className="registered-users-header">
                  <tr>
                    <th className="table-header-cell">Sr. No.</th>
                    <th className="table-header-cell">Name</th>
                    <th className="table-header-cell">Email</th>
                    <th className="table-header-cell">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="registered-users-body">
                  {data.map((d,index) => (
                    <tr key={d._id} className="registered-users-row">
                      <td className="table-data-cell">{index + 1}</td>
                      <td className="table-data-cell">{d.userId.name}</td>
                      <td className="table-data-cell">{d.userId.email}</td>
                      <td className={`table-data-cell payment-status ${d.paymentStatus.toLowerCase()}`}>
                      {d.paymentStatus}
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
            : (
              (new Date(event.date) >= today?
              <div>
                {isRegistered ? (
                  <p>Already Registered</p>
                ) : (
                  <Link onClick={handleRegister} to={`/`} className="event-register">
                    Register
                  </Link>
                )}
                </div>
              : "")
              )
        ):(
          <div className='center'>
          <Link className='nav-link' to="/register">Register</Link>
          <span className='nav-link'> / </span>
          <Link className='nav-link' to="/login">Login</Link>
          </div>
        )
       }
        
      </div>
       
    </div>
  );
};

export default EventDetailsPage;