import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('Student'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    if (!email) {
      setError('Please enter your university email address.');
      return;
    }
    setResetMessage(`A password reset link has been sent to ${email} (Mock).`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isRegistering) {
      // REGISTRATION FLOW
      if (!name || !email || !password || !department || !role) {
        setError('All fields are mandatory for registration.');
        return;
      }
      if (department === 'ECE') {
        setError('Registration Denied: This portal is restricted for ECE logic assignments.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role, name, email, department, password })
        });
        
        const data = await res.json();
        if (res.ok) {
          onLogin(data.user);
        } else {
          setError(data.error || 'Registration failed');
        }
      } catch (err) {
        setError('Network error during registration');
      }

    } else {
      // LOGIN FLOW
      if (!email || !password) {
        setError('Please enter your email and password to log in.');
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        if (res.ok) {
          onLogin(data.user);
        } else {
          setError(data.error || 'Invalid email or password');
        }
      } catch (err) {
        setError('Network error during login');
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setIsForgotPassword(false);
    setError('');
    setResetMessage('');
  };

  return (
    <div className="theme-peach login-container animate-fade-in" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="login-box glass-panel">
        <div className="login-header">
          <span className="login-icon">✨</span>
          <h2>Veltech Portal</h2>
          <p className="text-muted">{isForgotPassword ? "Reset your password" : (isRegistering ? "Create your academic account" : "Sign in to your account")}</p>
        </div>

        {error && <div className="form-error">{error}</div>}
        {resetMessage && <div className="form-success" style={{ backgroundColor: 'rgba(46, 213, 115, 0.1)', color: 'var(--success-color, #2ed573)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(46, 213, 115, 0.2)', fontSize: '0.95rem' }}>{resetMessage}</div>}

        {isForgotPassword ? (
          <form onSubmit={handleForgotSubmit} className="login-form">
            <div className="form-group">
              <label>University Email</label>
              <input 
                type="email" placeholder="student@veltech.edu.in"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full mt-4" style={{ padding: '14px', fontSize: '1rem' }}>
              Send Reset Link
            </button>
            <div className="text-center mt-3">
              <span style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' }} onClick={() => {setIsForgotPassword(false); setError(''); setResetMessage('');}}>
                Back to Login
              </span>
            </div>
          </form>
        ) : (
        <form onSubmit={handleSubmit} className="login-form">
          
          {isRegistering && (
            <>
              <div className="form-group row-group">
                 <div className="radio-group" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" value="Student" checked={role === 'Student'} onChange={(e) => setRole(e.target.value)} />
                      Student
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="radio" value="Faculty" checked={role === 'Faculty'} onChange={(e) => setRole(e.target.value)} />
                      Faculty
                    </label>
                 </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" placeholder="e.g. Sai Ganesh"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select className="select-input" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="" disabled>Select your department</option>
                  <option value="CSE">Computer Science and Engineering (CSE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="ECE">Electronics and Communication (ECE)</option>
                  <option value="EEE">Electricals and Electronics (EEE)</option>
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>University Email</label>
            <input 
              type="email" placeholder="student@veltech.edu.in"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ marginBottom: 0 }}>Password</label>
              {!isRegistering && (
                <span 
                  style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500' }}
                  onClick={() => { setIsForgotPassword(true); setError(''); setResetMessage(''); }}
                >
                  Forgot Password?
                </span>
              )}
            </div>
            <input 
              type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full mt-4" style={{ padding: '14px', fontSize: '1rem' }}>
            {isRegistering ? "Register & Login" : "Secure Login"}
          </button>
        </form>
        )}

        {!isForgotPassword && (
        <div className="text-center mt-4">
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <span style={{ color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '600' }} onClick={toggleMode}>
              {isRegistering ? "Log in" : "Sign up"}
            </span>
          </p>
        </div>
        )}
      </div>
    </div>
  );
};

export default Login;
