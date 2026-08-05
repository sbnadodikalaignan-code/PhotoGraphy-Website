import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'WEDDING',
    eventDate: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        eventType: 'WEDDING',
        eventDate: '',
        message: ''
      });
      // Clear message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">GET IN TOUCH</span>
          <h2 className="section-title">Talk to Us</h2>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Contact details */}
          <div className="contact-info">
            <h3 className="info-title">Let's Create Magic</h3>
            <p className="info-desc">
              Have an upcoming event or want a portrait session? Fill out the form or drop us an email/call. We respond to all inquiries within 24 hours.
            </p>

            <ul className="info-list">
              <li>
                <div className="info-icon-box">
                  <Mail size={18} />
                </div>
                <div className="info-details">
                  <span className="info-label">Email Us</span>
                  <a href="mailto:hello@rmphotography.com" className="info-value">hello@rmphotography.com</a>
                </div>
              </li>
              <li>
                <div className="info-icon-box">
                  <Phone size={18} />
                </div>
                <div className="info-details">
                  <span className="info-label">Call/WhatsApp</span>
                  <a href="tel:+919876543210" className="info-value">+91 98765 43210</a>
                </div>
              </li>
              <li>
                <div className="info-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="info-details">
                  <span className="info-label">Based in</span>
                  <span className="info-value">Bangalore &amp; Mumbai, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact form */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <div className="submit-success">
                <CheckCircle size={48} className="success-icon" />
                <h4>Thank You!</h4>
                <p>Your message has been sent. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="eventType" className="form-label">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="form-input select-input"
                    >
                      <option value="WEDDING">Wedding</option>
                      <option value="PRE-WEDDING">Pre-Wedding</option>
                      <option value="PORTRAIT">Portrait Shoot</option>
                      <option value="MATERNITY">Maternity</option>
                      <option value="OTHER">Other Events</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate" className="form-label">Event Date</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="form-input date-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input textarea-input"
                    placeholder="Tell us about your event, style, and details..."
                    required
                  />
                </div>

                <button type="submit" className="btn-gold submit-btn">
                  <span>SEND MESSAGE</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
