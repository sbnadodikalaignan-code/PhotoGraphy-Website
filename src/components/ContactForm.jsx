import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm({ asH1 = false }) {
  return (
    <section id="contact" className="section contact-direct-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrapper text-center">
          <span className="section-subtitle">LET'S CONNECT</span>
          {asH1 ? (
            <h1 className="section-title">Start Your Visual Journey</h1>
          ) : (
            <h2 className="section-title">Start Your Visual Journey</h2>
          )}
          <p className="contact-section-desc">
            Whether you are planning a grand royal wedding, a fine-art portrait shoot, or a newborn milestone, our team is excited to craft your memories.
          </p>
        </div>

        {/* Minimalist 3 Direct Buttons (WhatsApp, Instagram, Phone) */}
        <div className="contact-buttons-row text-center">
          <a 
            href="https://wa.me/919865696065?text=Hi%20Stories%20by%20Nadodikalaignan!%20I%20would%20like%20to%20inquire%20about%20a%20shoot." 
            target="_blank" 
            rel="noopener noreferrer"
            className="minimal-direct-btn whatsapp-style-btn"
          >
            <MessageCircle size={18} />
            <span>CHAT ON WHATSAPP</span>
            <ArrowRight size={16} />
          </a>

          <a 
            href="https://www.instagram.com/storiesbynadodikalaignan?stkn=aG14N3o0NDlyMTQ1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="minimal-direct-btn instagram-style-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>INSTAGRAM DM</span>
            <ArrowRight size={16} />
          </a>

          <a 
            href="tel:+919865696065" 
            className="minimal-direct-btn phone-style-btn"
          >
            <Phone size={18} />
            <span>CALL DIRECT</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
