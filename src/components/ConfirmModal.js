import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ event, onConfirm, onCancel }) => {
  if (!event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>Confirm Your Booking</h2>
        <div className="modal-details">
          <h3>{event.name}</h3>
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <p>📍 {event.location}</p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
