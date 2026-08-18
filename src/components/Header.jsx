import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToPage = (path) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    navigate(path);
  };

  const navigateToHome = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);

    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);

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
        <div className="logo" onClick={navigateToHome}>
          <img src="/images/logo.png" alt="Nadodikalaignan Photography Logo" className="logo-img" />
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-links">
            <li><button onClick={navigateToHome} className="nav-btn">HOME</button></li>

            {/* SERVICES Dropdown Menu */}
            <li
              className="nav-item-dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => scrollToSection('about')}
                className="nav-btn dropdown-toggle-btn"
              >
                <span>LATEST WORK</span>
                <ChevronDown size={14} className={`dropdown-arrow ${isServicesOpen ? 'open' : ''}`} />
              </button>

              <div className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                <button onClick={() => navigateToPage('/services/pre-wedding')} className="dropdown-item-btn">
                  <span>PRE-WEDDING</span>
                </button>
                <button onClick={() => navigateToPage('/services/wedding')} className="dropdown-item-btn">
                  <span>WEDDING</span>
                </button>
                <button onClick={() => navigateToPage('/services/baby-maternity')} className="dropdown-item-btn">
                  <span>BABY &amp; MATERNITY</span>
                </button>
              </div>
            </li>

            <li><button onClick={() => navigateToPage('/profiles')} className="nav-btn">ABOUT US</button></li>
          </ul>

          <button onClick={() => navigateToPage('/contact')} className="talk-to-us-btn">
            TALK TO US
          </button>
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
              <span className="mobile-nav-subtitle">LATEST WORK</span>
              <ul className="mobile-sublinks">
                <li><button onClick={() => navigateToPage('/services/pre-wedding')} className="mobile-subnav-btn">PRE-WEDDING</button></li>
                <li><button onClick={() => navigateToPage('/services/wedding')} className="mobile-subnav-btn">WEDDING</button></li>
                <li><button onClick={() => navigateToPage('/services/baby-maternity')} className="mobile-subnav-btn">BABY &amp; MATERNITY</button></li>
              </ul>
            </li>

            <li><button onClick={() => navigateToPage('/profiles')} className="mobile-nav-btn">ABOUT US</button></li>
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
