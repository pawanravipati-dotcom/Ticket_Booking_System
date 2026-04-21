import React, { useState, useEffect } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ event, currentUser, onConfirm, onCancel }) => {
  const [tickets, setTickets] = useState(1);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (event) {
      setTickets(1);
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setIsProcessing(false);
      setError('');
    }
  }, [event]);

  if (!event || !currentUser) return null;

  const total = event.price * tickets;

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Assignment Validations
    if (tickets <= 0) {
      setError('Number of tickets must be a positive number.');
      return;
    }
    if (tickets > event.availableTickets) {
      setError(`Cannot book more than ${event.availableTickets} available tickets.`);
      return;
    }
    
    // Gateway Validations
    if (cardNumber.replace(/\D/g, '').length !== 16) {
      setError('Invalid credit card. Must be 16 digits.');
      return;
    }
    if (!expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)) {
      setError('Invalid expiry formatting. Use MM/YY.');
      return;
    }
    if (cvv.replace(/\D/g, '').length < 3) {
      setError('Invalid CVV code.');
      return;
    }

    setIsProcessing(true);
    setError('');
    
    // We already have currentUser data from App level!
    const bookingDetails = {
      ...event,
      ticketsBought: tickets,
      totalPaid: total,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerDepartment: currentUser.department,
      customerRole: currentUser.role,
      bookingDate: new Date().toISOString()
    };
    
    // Simulate secure network transaction delay
    setTimeout(() => {
      onConfirm(bookingDetails);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel form-modal">
        <h2 className="modal-header">Complete Booking</h2>
        
        <div className="checkout-summary">
          <div className="checkout-img" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
          <div className="checkout-info">
            <h3>{event.name}</h3>
            <p className="text-secondary">{event.departmentName} Dept event</p>
            <p className="text-accent">₹{event.price} / ticket</p>
          </div>
        </div>

        <form onSubmit={handleCheckout} className="checkout-form">
          {/* Identity block locked based on Login user */}
          <div className="form-group identity-box" style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 6px', fontSize: '0.9rem', color: '#64748b' }}>Booking on behalf of:</p>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#0ea5e9' }}>{currentUser.name} ({currentUser.role})</h4>
            <p style={{ margin: '0', fontSize: '0.85rem', color: '#64748b' }}>{currentUser.email} • {currentUser.department} Dept</p>
          </div>

          <div className="form-group ticket-selector mt-4">
            <label>Number of Tickets Required *</label>
            <div className="counter">
              <button type="button" onClick={() => setTickets(Math.max(1, tickets - 1))}>-</button>
              <span>{tickets}</span>
              <button type="button" onClick={() => setTickets(Math.min(event.availableTickets, tickets + 1))}>+</button>
            </div>
            <small className="text-muted text-right">{event.availableTickets} tickets remaining</small>
          </div>

          <div className="checkout-total">
            <span>Total Amount:</span>
            <span className="total-price">₹{total}</span>
          </div>

          {/* Secure Payment Gateway Sim */}
          <div className="payment-gateway form-group mt-4 p-3" style={{ border: '1px solid var(--panel-border)', borderRadius: '8px', background: '#fdfdfd' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: '#0f172a', display: 'flex', justifyContent: 'space-between' }}>
              <span>Secure Payment Interface 🔒</span>
              <span style={{color: '#94a3b8', fontSize: '12px'}}>Visa / MC accepted</span>
            </h4>
            
            <input 
              type="text" 
              placeholder="Card Number (16 Digits)" 
              className="mt-2" 
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input 
                type="text" 
                placeholder="MM/YY" 
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input 
                type="password" 
                placeholder="CVV" 
                maxLength="4"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
          </div>

          {error && <p className="form-error animate-fade-in">{error}</p>}

          <div className="modal-actions mt-4">
            <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isProcessing}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isProcessing}>
              {isProcessing ? '🛡️ processing secure transaction..' : `Pay ₹${total}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
