import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onAction, actionText, actionType, disabled, isBooked, isBookingView }) => {
  const eventDate = new Date(event.date);
  const timeDiff = eventDate.getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const countdownText = daysLeft > 0 ? `(In ${daysLeft} days)` : (daysLeft === 0 ? `(Today!)` : `(Past)`);

  const downloadImageReceipt = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 600, 760);
    
    // Header
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(0, 0, 600, 110);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('OFFICIAL RECEIPT', 300, 50);
    ctx.font = '18px Arial';
    ctx.fillText('CSE Department Event Admissions', 300, 85);
    
    // Content
    ctx.fillStyle = '#1e293b';
    ctx.font = '22px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Event:`, 40, 170);
    ctx.font = 'bold 22px Arial';
    ctx.fillText(event.name, 150, 170);
    
    ctx.font = '22px Arial';
    ctx.fillText(`Date:`, 40, 220);
    ctx.font = 'bold 22px Arial';
    ctx.fillText(`${eventDate.toLocaleDateString()} at ${event.time}`, 150, 220);
    
    ctx.font = '22px Arial';
    ctx.fillText(`Location:`, 40, 270);
    ctx.font = 'bold 22px Arial';
    ctx.fillText(event.location, 150, 270);
    
    // Divider
    ctx.beginPath();
    ctx.moveTo(40, 310);
    ctx.lineTo(560, 310);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
    
    // Customer
    ctx.fillStyle = '#64748b';
    ctx.font = '18px Arial';
    ctx.fillText('ATTENDEE IDENTITY', 40, 350);
    
    ctx.fillStyle = '#1e293b';
    ctx.font = '20px Arial';
    ctx.fillText(`Name: ${event.customerName} (${event.customerRole})`, 40, 390);
    ctx.fillText(`Email: ${event.customerEmail}`, 40, 430);
    ctx.fillText(`Dept: ${event.customerDepartment}`, 40, 470);
    
    // Divider
    ctx.beginPath();
    ctx.moveTo(40, 510);
    ctx.lineTo(560, 510);
    ctx.stroke();
    
    // Finance
    ctx.fillStyle = '#64748b';
    ctx.font = '18px Arial';
    ctx.fillText('PAYMENT SUMMARY', 40, 550);
    
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Tickets: ${event.ticketsBought}`, 40, 595);
    
    ctx.fillStyle = '#0d9488';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(`Total Paid: Rs. ${event.totalPaid}`, 40, 645);
    
    // Barcode Simulation
    ctx.fillStyle = '#1e293b';
    for(let i=0; i<38; i++) {
        const width = Math.random() * 4 + 1;
        ctx.fillRect(40 + (i * 14), 680, width, 50);
    }
    ctx.font = '10px Arial';
    ctx.fillText(`ID: ${event.bookingId || event.id}-${Math.floor(Math.random()*10000)}`, 40, 745);
    
    const link = document.createElement('a');
    link.download = `Ticket_${event.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  const handleShare = () => {
    const text = `Join me at ${event.name} on ${eventDate.toLocaleDateString()} at ${event.location}! Grab a ticket before they sell out!`;
    navigator.clipboard.writeText(text);
    alert('Event details copied to clipboard!');
  };

  return (
    <div className="event-card glass-panel animate-fade-in">
      <div 
        className="event-image" 
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <span className="category-tag">{event.category}</span>
        <span className="price-tag">₹{event.price}</span>
      </div>
      
      <div className="event-content">
        <h3 className="event-title" title={event.name}>{event.name}</h3>
        <p className="event-dept">{event.departmentName} Department</p>
        <p className="event-desc">{event.description}</p>
        
        <div className="event-details">
          <p>
            <span className="icon">📅</span> {eventDate.toLocaleDateString()} at {event.time}
            {!isBookingView && <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', marginLeft: '6px', fontWeight: '500' }}>{countdownText}</span>}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0 }}><span className="icon">📍</span> {event.location}</p>
            {!isBookingView && (
              <span 
                onClick={handleShare}
                style={{ cursor: 'pointer', color: 'var(--accent-primary)', fontSize: '1.2rem' }}
                title="Share Event"
              >
                🔗
              </span>
            )}
          </div>
          {!isBookingView && (
            <div className="ticket-tracker" style={{ marginTop: '12px' }}>
              <p><span className="icon">🎟️</span> {event.availableTickets} tickets remaining</p>
              <div className="progress-bar-bg" style={{ width: '100%', height: '6px', background: 'var(--panel-border)', borderRadius: '4px', marginTop: '6px', overflow: 'hidden' }}>
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${Math.min((event.availableTickets / 150) * 100, 100)}%`, 
                    height: '100%', 
                    background: event.availableTickets <= 20 ? 'var(--danger)' : 'var(--accent-primary)',
                    transition: 'width 0.5s ease',
                    boxShadow: event.availableTickets <= 20 ? '0 0 8px var(--danger)' : '0 0 8px var(--accent-primary)'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {isBookingView && (
          <div className="booking-receipt">
            <h4 className="receipt-title">Booking Summary</h4>
            <div className="receipt-row">
              <span className="text-muted">User Name</span>
              <span>{event.customerName}</span>
            </div>
            <div className="receipt-row">
              <span className="text-muted">Department</span>
              <span>{event.customerDepartment}</span>
            </div>
            <div className="receipt-row">
              <span className="text-muted">Tickets Booked</span>
              <span>{event.ticketsBought}</span>
            </div>
            <div className="receipt-row total">
              <span className="text-muted">Total Amount</span>
              <span className="text-accent">₹{event.totalPaid}</span>
            </div>
          </div>
        )}

        <div className="event-footer" style={{ display: 'flex', gap: '10px' }}>
          {isBookingView && (
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={downloadImageReceipt}>
              📥 Print Ticket
            </button>
          )}

          {isBooked ? (
            <span className="booked-status" style={{ flex: 1, textAlign: 'center' }}>✅ Confirmed</span>
          ) : (
            <button 
              className={`btn btn-full ${actionType === 'danger' ? 'btn-danger' : 'btn-primary'}`} 
              style={{ flex: 2 }}
              onClick={() => onAction(event)}
              disabled={disabled || event.availableTickets === 0}
            >
              {event.availableTickets === 0 ? "Sold Out" : actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
