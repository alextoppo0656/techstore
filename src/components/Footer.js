import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span>⬡</span> TechStore
          </Link>
          <p>Premium tech gadgets, delivered fast. Quality you can trust, prices you'll love.</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/">All Products</Link>
            <a href="#categories">Categories</a>
            <a href="#featured">Featured</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">FAQ</a>
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024 TechStore. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
