import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">

          {/* Logo block */}
          <div className="footer-brand">
            <div className="logo" onClick={scrollToTop}>
              <img src="/images/logo.png" alt="Nadodikalaignan Photography Logo" className="logo-img" />
            </div>
            <p className="brand-tagline">Timeless storytelling through candid frames.</p>
          </div>

          {/* Links block */}
          <div className="footer-nav-block">
            <h4 className="footer-heading">NAVIGATE</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Studio</a></li>
              <li><a href="#portfolio">Albums</a></li>
              <li><a href="#profiles">Profiles &amp; CEO</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Social icons block */}
          <div className="footer-socials-block">
            <h4 className="footer-heading">FOLLOW US</h4>
            <p className="social-desc">Follow our latest weddings and journals on social channels.</p>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide-instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Pinterest">
                {/* Custom P icon for Pinterest */}
                <span className="pinterest-custom">P</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll back to top */}
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Nadodikalaignan Photography. All rights reserved.</p>

          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
            <span>BACK TO TOP</span>
            <div className="arrow-circle">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
