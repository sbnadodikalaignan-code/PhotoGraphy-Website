import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, Download, Share2, Play, Pause, X, ChevronLeft, ChevronRight, 
  Camera, Check, Calendar, User, Phone, Mail, MapPin, Sparkles, Star, ArrowRight, CheckCircle
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Testimonials from './Testimonials';
import { SERVICES_DATA } from '../data/servicesData';
import './ServicePage.css';

export default function ServicePage({ serviceId: propServiceId }) {
  const { serviceId: paramsServiceId } = useParams();
  
  // Resolve active service key
  const activeKey = propServiceId || paramsServiceId || 'wedding';
  const serviceData = SERVICES_DATA[activeKey] || SERVICES_DATA['wedding'];

  // Gallery & Action state
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Lightbox & Slideshow state
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Booking Modal
  const [bookingModal, setBookingModal] = useState({ isOpen: false, packageName: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    shootDate: '',
    location: '',
    packageSelected: '',
    notes: ''
  });

  // Filter items
  const displayItems = serviceData.gallery.filter(item => {
    if (showOnlyFavs) return favorites.includes(item.id);
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Toast notification helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle favorite
  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      triggerToast('Removed from your favorites collection.');
    } else {
      setFavorites([...favorites, id]);
      triggerToast('Added photo to your favorites collection!');
    }
  };

  // Trigger single download
  const handleDownload = (e, photo) => {
    e.stopPropagation();
    const a = document.createElement('a');
    a.href = photo.image;
    a.download = `${serviceData.id}-${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    triggerToast(`Downloading high-res photo: "${photo.title}"`);
  };

  // Share action
  const handleShare = (e, photoTitle = '') => {
    if (e) e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast(`Gallery link copied to clipboard! ${photoTitle ? `(${photoTitle})` : ''}`);
    } else {
      triggerToast('Link copied to clipboard!');
    }
  };

  // Download all gallery ZIP simulated trigger
  const handleDownloadAll = () => {
    triggerToast(`Preparing HD Zip Archive for ${serviceData.title}... Download starting.`);
  };

  // Automatic Slideshow Timer Effect
  useEffect(() => {
    let interval = null;
    if (isSlideshow && isPlaying && displayItems.length > 0) {
      interval = setInterval(() => {
        setLightboxIndex(prev => (prev === null ? 0 : (prev + 1) % displayItems.length));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isSlideshow, isPlaying, displayItems.length]);

  // Start Slideshow
  const startSlideshow = () => {
    if (displayItems.length === 0) return;
    setLightboxIndex(0);
    setIsSlideshow(true);
    setIsPlaying(true);
  };

  // Close Lightbox / Slideshow
  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsSlideshow(false);
    setIsPlaying(false);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % displayItems.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + displayItems.length) % displayItems.length);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, displayItems.length]);

  // Open booking modal
  const openBooking = (pkgName = '') => {
    setFormData(prev => ({ ...prev, packageSelected: pkgName || serviceData.title }));
    setBookingModal({ isOpen: true, packageName: pkgName });
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setBookingModal({ isOpen: false, packageName: '' });
      setFormSubmitted(false);
    }, 2800);
  };

  return (
    <div className="service-editorial-page">
      <Header />

      {/* Toast Floating Notification */}
      {toastMessage && (
        <div className="editorial-toast animate-slide-down">
          <Sparkles size={16} className="gold-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* GALLERY MAIN MASONRY CONTAINER */}
      <section className="client-gallery-section">
        <div className="container-fluid">
          
          {displayItems.length === 0 ? (
            <div className="empty-gallery-state text-center">
              <Heart size={40} className="gold-icon" />
              <h3>No photos found in this collection.</h3>
              <p>Try switching categories or clearing your favorites filter.</p>
              <button className="btn-gold-primary" onClick={() => { setActiveCategory('All'); setShowOnlyFavs(false); }}>
                Show All Photos
              </button>
            </div>
          ) : (
            <div className="editorial-masonry-container">
              {displayItems.map((photo, index) => {
                const isFav = favorites.includes(photo.id);
                return (
                  <div 
                    key={photo.id}
                    className="editorial-photo-card"
                    onClick={() => { setLightboxIndex(index); setIsSlideshow(false); }}
                  >
                    <div className="photo-image-frame">
                      <img src={photo.image} alt={photo.title} loading="lazy" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* LIGHTBOX MODAL VIEWER */}
      {lightboxIndex !== null && displayItems[lightboxIndex] && (
        <div className="editorial-lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-viewport" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close">
              <X size={32} />
            </button>

            {/* Prev Nav Arrow */}
            <button 
              className="lightbox-nav-arrow left"
              onClick={() => setLightboxIndex((lightboxIndex - 1 + displayItems.length) % displayItems.length)}
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>

            {/* Centered Image */}
            <div className="lightbox-image-container">
              <img 
                src={displayItems[lightboxIndex].image} 
                alt={displayItems[lightboxIndex].title}
                className="lightbox-main-img animate-fade-in" 
              />
            </div>

            {/* Next Nav Arrow */}
            <button 
              className="lightbox-nav-arrow right"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % displayItems.length)}
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>

          </div>
        </div>
      )}

      {/* BOOKING DRAWER MODAL */}
      {bookingModal.isOpen && (
        <div className="booking-modal-overlay" onClick={() => setBookingModal({ isOpen: false, packageName: '' })}>
          <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBookingModal({ isOpen: false, packageName: '' })}>
              <X size={22} />
            </button>

            {!formSubmitted ? (
              <>
                <div className="modal-header">
                  <Camera size={28} className="modal-icon" />
                  <h3>Book Your Shoot</h3>
                  <p>Pre-selected: <strong className="gold-text">{formData.packageSelected || serviceData.title}</strong></p>
                </div>

                <form onSubmit={handleFormSubmit} className="booking-form">
                  <div className="form-group">
                    <label><User size={14} /> Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label><Phone size={14} /> Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label><Mail size={14} /> Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label><Calendar size={14} /> Preferred Shoot Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.shootDate}
                        onChange={(e) => setFormData({ ...formData, shootDate: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label><MapPin size={14} /> Shoot Location / City</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Chennai, Madurai, Munnar"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional Shoot Details &amp; Notes</label>
                    <textarea 
                      rows="3" 
                      placeholder="Tell us about your shoot ideas, themes, or special requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold-primary submit-btn">
                    <span>CONFIRM &amp; SEND INQUIRY</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success-state text-center">
                <div className="success-icon-wrap">
                  <Check size={40} />
                </div>
                <h3>Inquiry Submitted Successfully!</h3>
                <p>Thank you <strong className="gold-text">{formData.name}</strong>. Our lead photographer will contact you via WhatsApp/Phone within 2 hours to finalize details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
