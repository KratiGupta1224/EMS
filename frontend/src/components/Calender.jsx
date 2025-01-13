import React, { useState } from 'react';

const Calendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar">
      <h2>Event Calendar</h2>
      <ul>
        {events.map(event => (
          <li key={event._id} onClick={() => handleDateClick(event.date)}>
            {event.name} - {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <div>
        <h3>Selected Date: {new Date(selectedDate).toLocaleDateString()}</h3>
      </div>
    </div>
  );
};

export default Calendar;
