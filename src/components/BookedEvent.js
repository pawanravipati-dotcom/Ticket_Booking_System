import React from "react";
import { useNavigate } from "react-router-dom";

function BookedEvent({ bookings }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Booked Events</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((event, index) => (
          <div key={index}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.location}</p>
          </div>
        ))
      )}

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default BookedEvent;