import React, { useState } from 'react';
import EventCard from './EventCard';
import './Home.css';

const Home = ({ events, onBook, bookings, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  const categories = ['All', 'Tech', 'Seminar'];

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  let sortedEvents = [...filteredEvents];
  if (sortOrder === 'low') {
    sortedEvents.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    sortedEvents.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="animate-fade-in">
      <div className="header-section text-center mb-4">
        <h2 className="main-title">CSE Department Events</h2>
        <p className="text-muted">Register for upcoming fests, seminars, and workshops.</p>
      </div>
      
      <div className="filters-container">
        <input 
          type="text" 
          className="search-bar no-margin" 
          placeholder="Search for events by name or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div className="category-pills" style={{ margin: 0 }}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`pill ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            className="select-input" 
            style={{ width: 'auto', padding: '10px 16px', background: 'var(--panel-bg)', cursor: 'pointer' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sort: Recommended</option>
            <option value="low">Sort: Price (Low to High)</option>
            <option value="high">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center text-muted mt-4 p-4 glass-panel empty-state">
          <h3>No events found 🚫</h3>
          <p>Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid-container">
          {sortedEvents.map(event => {
            const isBooked = bookings.some(b => (b.eventId === event.id || b.id === event.id) && b.customerEmail === currentUser?.email);
            return (
              <EventCard 
                key={event.id} 
                event={event} 
                onAction={onBook} 
                actionText="Book Ticket"
                isBooked={isBooked}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
