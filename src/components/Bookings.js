import React from 'react';
import EventCard from './EventCard';

const Bookings = ({ bookings, onCancel, currentUser }) => {
  // Isolate tickets using the logged in user's email only
  const myBookings = bookings.filter(b => b.customerEmail === currentUser.email);
  
  const totalTickets = myBookings.reduce((sum, b) => sum + (b.ticketsBought || 0), 0);
  const totalExpenditure = myBookings.reduce((sum, b) => sum + (b.totalPaid || 0), 0);

  return (
    <div className="animate-fade-in">
      <div className="header-section text-center mb-4">
        <h2 className="main-title">Your Private Tickets</h2>
        <p className="text-muted">Manage your upcoming event tickets safely isolated to your account.</p>
      </div>

      <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', marginBottom: '30px', textAlign: 'center' }}>
        <div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>{myBookings.length}</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Events Joined</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>{totalTickets}</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Tickets</p>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '4px' }}>₹{totalExpenditure}</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Expenditure</p>
        </div>
      </div>

      {myBookings.length === 0 ? (
        <div className="text-center text-muted mt-4 p-4 glass-panel empty-state">
          <h3>No tickets found 🎫</h3>
          <p>You haven't booked any events yet on this account. Head over to the All Events tab to find seminars!</p>
        </div>
      ) : (
        <div className="grid-container">
          {myBookings.map((event, i) => (
            <EventCard 
              key={`${event.id}-${i}`} 
              event={event} 
              onAction={onCancel} 
              actionText="Cancel Booking"
              actionType="danger"
              isBookingView={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
