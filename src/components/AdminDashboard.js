import React, { useState } from 'react';
import { API_BASE_URL } from '../api';

const AdminDashboard = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    departmentName: '',
    category: 'Tech',
    price: '',
    availableTickets: '',
    description: '',
    imageUrl: ''
  });
  
  const [statusMsg, setStatusMsg] = useState('');

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center p-4 mt-4 glass-panel animate-fade-in" style={{ padding: '40px' }}>
        <h2 style={{ color: 'var(--danger)' }}>Access Denied</h2>
        <p className="text-muted">You do not have administrative clearance to view this secure portal.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Pushing event to live database...');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        availableTickets: parseInt(formData.availableTickets)
      };

      const res = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatusMsg('✅ Success! Event securely instantiated injected into SQLite.');
        setFormData({
          name: '', date: '', time: '', location: '', departmentName: '',
          category: 'Tech', price: '', availableTickets: '', description: '', imageUrl: ''
        });
        setTimeout(() => setStatusMsg(''), 4000);
      } else {
        const err = await res.json();
        setStatusMsg(`❌ Error: ${err.error}`);
      }
    } catch (err) {
      setStatusMsg('❌ Fatal Network Error during database pipeline.');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="header-section text-center mb-4">
        <h2 className="main-title text-accent">Admin Authority Portal</h2>
        <p className="text-muted">Deploy brand new university events globally to all local users.</p>
      </div>

      <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Event Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. CodeX AI Symposium" />
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Time</label>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Location / Venue</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Block 3, Auditorium" />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Price (Rs)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} min="0" />
            </div>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Total Tickets</label>
                <input required type="number" name="availableTickets" value={formData.availableTickets} onChange={handleChange} min="1" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Target Department</label>
                <select required name="departmentName" value={formData.departmentName} onChange={handleChange} className="select-input">
                  <option value="">Select Dept...</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="ALL">ALL (General)</option>
                </select>
            </div>
            <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="select-input">
                  <option value="Tech">Tech</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                </select>
            </div>
          </div>

          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>HD Image URL</label>
            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://images.unsplash.com/..." />
          </div>

          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Description</label>
            <input required type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Brief summary of the event activities." />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', fontSize: '1.1rem', padding: '12px' }}>
            🚀 Deploy to Database
          </button>

          {statusMsg && (
              <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: statusMsg.includes('Success') ? 'var(--success)' : 'var(--danger)' }}>
                  {statusMsg}
              </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
