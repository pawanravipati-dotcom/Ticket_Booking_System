import React from "react";
import { useNavigate } from "react-router-dom";

function EventList({ events, onSelect }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    onSelect(event);
    navigate("/confirm");
  };

  return (
    <div>
      <h1>Event Booking App</h1>
      <h2>Available Events</h2>

      {events.map((e) => (
        <div key={e.id}>
          <h3>{e.name}</h3>
          <p>{e.date}</p>
          <p>{e.location}</p>

          <button onClick={() => handleClick(e)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default EventList;