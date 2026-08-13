import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm() {
  return (
    <section id="contact" className="section section-dark contact-direct-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrapper text-center">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h2 className="section-title">Talk to Us</h2>
        </div>

        {/* Minimalist 3 Direct Buttons (WhatsApp, Instagram, Phone) */}
        <div className="contact-buttons-row text-center">
          <a 
            href="https://wa.me/919876543210?text=Hi%20Nadodikalaignan%20Photography!%20I%20would%20like%20to%20inquire%20about%20a%20shoot." 
            target="_blank" 
            rel="noopener noreferrer"
            className="minimal-direct-btn whatsapp-style-btn"
          >
            <MessageCircle size={18} />
            <span>WHATSAPP</span>
            <ArrowRight size={16} />
          </a>

          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minimal-direct-btn instagram-style-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>INSTAGRAM</span>
            <ArrowRight size={16} />
          </a>

          <a 
            href="tel:+919876543210" 
            className="minimal-direct-btn phone-style-btn"
          >
            <Phone size={18} />
            <span>PHONE</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
