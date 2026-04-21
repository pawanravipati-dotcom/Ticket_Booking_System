import React from "react";
import { useNavigate } from "react-router-dom";

function ConfirmPage({ event, onConfirm }) {
  const navigate = useNavigate();

  // ✅ Prevent crash
  if (!event) {
    return (
      <div>
        <h2>No event selected</h2>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    onConfirm(event);
    navigate("/booked");
  };

  return (
    <div>
      <h2>Confirm Booking</h2>

      <h3>{event.name}</h3>
      <p>{event.date}</p>
      <p>{event.location}</p>

      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

export default ConfirmPage;