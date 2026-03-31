import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} SummaShop Platform. All rights reserved.</p>
        <p className="footer-subtext">Premium E-Commerce Experience Built with React.</p>
      </div>
    </footer>
  );
};

export default Footer;
