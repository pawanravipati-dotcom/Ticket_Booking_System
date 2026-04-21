import React from 'react';
import './Navbar.css';

const Navbar = ({ currentTab, setCurrentTab, bookingCount, user, onLogout }) => {
  return (
    <nav className="navbar animate-fade-in">
      <div className="navbar-brand">
        <span className="logo-icon">🏛️</span>
        <span className="logo-text">Veltech Events</span>
      </div>
      <div className="navbar-links">
        <button 
          className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          All Events
        </button>
        <button 
          className={`nav-item ${currentTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setCurrentTab('bookings')}
        >
          My Tickets
          {bookingCount > 0 && <span className="badge">{bookingCount}</span>}
        </button>

        {user?.role === 'admin' && (
          <button 
            className={`nav-item ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentTab('admin')}
            style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}
          >
            Manage Events 🔒
          </button>
        )}
        
        <div className="user-profile">
          <span className="user-name">👤 {user?.name}</span>
          <button className="nav-item logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
