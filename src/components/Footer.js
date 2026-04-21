import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Done by <strong>Pawan Kumar</strong></p>
        <p>3rd Year B.Tech CSE</p>
        <p><a href="mailto:pawan@gmail.com">pawan@gmail.com</a></p>
        <p className="mt-4 text-xs text-muted">© 2026 Veltech University Internal Portal</p>
      </div>
    </footer>
  );
};

export default Footer;
