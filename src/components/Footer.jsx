import React from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goHome = () => {
    if (pathname !== '/') {
      navigate('/');
      return;
    }

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
            <div className="logo" onClick={goHome}>
              <img src="https://media.nadodikalaignan.com/images/other/logo.png" alt="Stories by Nadodikalaignan Logo" className="logo-img" />
            </div>
            <p className="brand-tagline">Timeless storytelling through candid frames.</p>
          </div>

          {/* Links block */}
          <div className="footer-nav-block">
            <h4 className="footer-heading">NAVIGATE</h4>
            <ul className="footer-links">
              <li><button type="button" className="footer-nav-btn" onClick={goHome}>Home</button></li>
              <li><Link to="/albums">Films</Link></li>
              <li><Link to="/profiles">About Studio</Link></li>
              <li><Link to="/services/wedding">Latest Work</Link></li>
              <li><Link to="/#faq">FAQ</Link></li>
              <li><Link to="/contact">Talk to Us</Link></li>
            </ul>
          </div>

          {/* Social icons block */}
          <div className="footer-socials-block">
            <h4 className="footer-heading">FOLLOW US</h4>
            <p className="social-desc">Follow our latest weddings and journals on social channels.</p>
            <div className="social-icons">
              <a href="https://www.instagram.com/storiesbynadodikalaignan?stkn=aG14N3o0NDlyMTQ1" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Stories by Nadodikalaignan Instagram" title="Stories by Nadodikalaignan">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.instagram.com/nadodikalaignan?stkn=MWd2M2Q4c3B3d2hpbg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Nadodikalaignan Instagram" title="Nadodikalaignan Founder Profile">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/919865696065" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp" title="Chat on WhatsApp">
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll back to top */}
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Stories by Nadodikalaignan. All rights reserved.</p>

          <button className="scroll-top-btn" onClick={goHome} aria-label="Go to the home page">
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
