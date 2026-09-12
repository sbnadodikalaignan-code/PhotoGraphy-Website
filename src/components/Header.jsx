import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ heroTone = 'dark' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInstaOpen, setIsInstaOpen] = useState(false);
  
  const instaTimerRef = useRef(null);
  const servicesTimerRef = useRef(null);
  const instaDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event) => {
      if (instaDropdownRef.current && !instaDropdownRef.current.contains(event.target)) {
        setIsInstaOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    };
  }, []);

  const handleInstaMouseEnter = () => {
    if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
    setIsInstaOpen(true);
  };

  const handleInstaMouseLeave = () => {
    if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
    instaTimerRef.current = setTimeout(() => {
      setIsInstaOpen(false);
    }, 380); // Smooth 380ms delay gives user comfortable time to interact
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 350);
  };

  const navigateToPage = (path) => {
    if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsInstaOpen(false);
    navigate(path);
  };

  const navigateToHome = () => {
    if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsInstaOpen(false);

    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

  const scrollToSection = (id) => {
    if (instaTimerRef.current) clearTimeout(instaTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsInstaOpen(false);

    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <a 
          href="https://www.instagram.com/storiesbynadodikalaignan?stkn=aG14N3o0NDlyMTQ1" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="logo"
          aria-label="Stories by Nadodikalaignan on Instagram"
          title="Visit @storiesbynadodikalaignan on Instagram"
        >
          <img src="/images/logo.png" alt="Stories by Nadodikalaignan Logo" className="logo-img" />
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            <li><button onClick={navigateToHome} className="nav-btn">HOME</button></li>

            {/* SERVICES Dropdown Menu */}
            <li
              ref={servicesDropdownRef}
              className="nav-item-dropdown"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                onClick={() => scrollToSection('latest-work')}
                className="nav-btn dropdown-toggle-btn"
              >
                <span>SERVICES</span>
                <ChevronDown size={14} className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`} />
              </button>

              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                <button onClick={() => navigateToPage('/work/weddings')} className="dropdown-item-btn">
                  <span>WEDDINGS</span>
                </button>
                <button onClick={() => navigateToPage('/work/events')} className="dropdown-item-btn">
                  <span>EVENTS</span>
                </button>
                <button onClick={() => navigateToPage('/work/portraits')} className="dropdown-item-btn">
                  <span>PORTRAITS</span>
                </button>
                <button onClick={() => navigateToPage('/work/toddlers')} className="dropdown-item-btn">
                  <span>TODDLERS</span>
                </button>
              </div>
            </li>

            <li><button onClick={() => navigateToPage('/profiles')} className="nav-btn">ABOUT US</button></li>
          </ul>

          <div className="header-right-actions">
            {/* Instagram Dropdown Menu Tray */}
            <div 
              ref={instaDropdownRef}
              className="header-instagram-dropdown-wrapper"
              onMouseEnter={handleInstaMouseEnter}
              onMouseLeave={handleInstaMouseLeave}
            >
              <button 
                type="button"
                className={`header-instagram-icon ${isInstaOpen ? 'active' : ''}`}
                onClick={() => setIsInstaOpen(!isInstaOpen)}
                aria-label="Instagram Profiles"
                title="Follow us on Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </button>

              <div className={`insta-dropdown-menu ${isInstaOpen ? 'show' : ''}`}>
                <div className="insta-dropdown-header">Follow on Instagram</div>
                
                <a 
                  href="https://www.instagram.com/storiesbynadodikalaignan?stkn=aG14N3o0NDlyMTQ1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="insta-dropdown-item"
                  onClick={() => setIsInstaOpen(false)}
                >
                  <div className="insta-item-icon">
                    <img src="/images/logo.png" alt="Stories by Nadodikalaignan Logo" className="insta-item-avatar insta-avatar-logo" />
                  </div>
                  <div className="insta-item-info">
                    <span className="insta-item-handle">@storiesbynadodikalaignan</span>
                    <span className="insta-item-role">Weddings & Photography</span>
                  </div>
                </a>

                <div className="insta-dropdown-divider"></div>

                <a 
                  href="https://www.instagram.com/nadodikalaignan?stkn=MWd2M2Q4c3B3d2hpbg%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="insta-dropdown-item"
                  onClick={() => setIsInstaOpen(false)}
                >
                  <div className="insta-item-icon">
                    <img src="/images/nadodikalaignan ceo.webp" alt="Nadodikalaignan CEO" className="insta-item-avatar insta-avatar-photo" />
                  </div>
                  <div className="insta-item-info">
                    <span className="insta-item-handle">@nadodikalaignan</span>
                    <span className="insta-item-role">Filmmaker & Founder</span>
                  </div>
                </a>
              </div>
            </div>

            <button onClick={() => navigateToPage('/contact')} className="talk-to-us-btn">
              TALK TO US
            </button>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation Drawer */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-links">
            <li><button onClick={navigateToHome} className="mobile-nav-btn">HOME</button></li>

            {/* Mobile Services Submenu */}
            <li className="mobile-dropdown-group">
              <span className="mobile-nav-subtitle">SERVICES</span>
              <ul className="mobile-sublinks">
                <li><button onClick={() => navigateToPage('/work/weddings')} className="mobile-subnav-btn">WEDDINGS</button></li>
                <li><button onClick={() => navigateToPage('/work/events')} className="mobile-subnav-btn">EVENTS</button></li>
                <li><button onClick={() => navigateToPage('/work/portraits')} className="mobile-subnav-btn">PORTRAITS</button></li>
                <li><button onClick={() => navigateToPage('/work/toddlers')} className="mobile-subnav-btn">TODDLERS</button></li>
              </ul>
            </li>

            <li><button onClick={() => navigateToPage('/profiles')} className="mobile-nav-btn">ABOUT US</button></li>
            
            <li className="mobile-social-wrap">
              <span className="mobile-social-title">FOLLOW ON INSTAGRAM</span>
              <div className="mobile-social-links">
                <a 
                  href="https://www.instagram.com/storiesbynadodikalaignan?stkn=aG14N3o0NDlyMTQ1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mobile-instagram-link"
                >
                  <div className="mobile-insta-avatar-wrapper">
                    <img src="/images/logo.png" alt="Stories by Nadodikalaignan" className="mobile-insta-avatar insta-avatar-logo" />
                  </div>
                  <span>@storiesbynadodikalaignan</span>
                </a>

                <a 
                  href="https://www.instagram.com/nadodikalaignan?stkn=MWd2M2Q4c3B3d2hpbg%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mobile-instagram-link"
                >
                  <div className="mobile-insta-avatar-wrapper">
                    <img src="/images/nadodikalaignan ceo.webp" alt="Nadodikalaignan" className="mobile-insta-avatar insta-avatar-photo" />
                  </div>
                  <span>@nadodikalaignan</span>
                </a>
              </div>
            </li>

            <li>
              <button onClick={() => navigateToPage('/contact')} className="mobile-talk-btn">
                TALK TO US
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
