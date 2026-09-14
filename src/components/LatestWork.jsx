import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyImage from './LazyImage';
import './LatestWork.css';

gsap.registerPlugin(ScrollTrigger);

const LATEST_WORK_ITEMS = [
  { id: 1, title: 'Eternal Whispers', category: 'Weddings', location: 'Royal Palace, Udaipur', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (1).webp', aspect: 'tall' },
  { id: 2, title: 'Golden Hour Solitude', category: 'Portraits', location: 'Heritage Fort', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (2).webp', aspect: 'wide' },
  { id: 3, title: 'Coastal Serenade', category: 'Weddings', location: 'Mahabalipuram Coast', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (3).webp', aspect: 'tall' },
  { id: 4, title: 'Tender Beginnings', category: 'Baby & Maternity', location: 'Cozy Studio', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (4).webp', aspect: 'wide' },
  { id: 5, title: 'Sacred Muhurtham', category: 'Weddings', location: 'Grand Mandapam', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (5).webp', aspect: 'tall' },
  { id: 6, title: 'Velvet Horizon', category: 'Portraits', location: 'Daylight Loft', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (6).webp', aspect: 'tall' },
  { id: 7, title: 'Mist & Magic', category: 'Weddings', location: 'Munnar Tea Hills', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (7).webp', aspect: 'wide' },
  { id: 8, title: 'Sculpted Shadows', category: 'Portraits', location: 'Fine Art Studio', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (8).webp', aspect: 'tall' },
  { id: 9, title: 'The Royal Jayamala', category: 'Weddings', location: 'Palace Grounds', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (9).webp', aspect: 'wide' },
  { id: 10, title: 'Festive Garland', category: 'Weddings', location: 'Heritage Court', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (10).webp', aspect: 'tall' },
  { id: 11, title: 'Sunlit Romance', category: 'Weddings', location: 'Pondicherry French Quarter', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (11).webp', aspect: 'tall' },
  { id: 12, title: 'Little Wonder', category: 'Baby & Maternity', location: 'Cloud Setup', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (12).webp', aspect: 'wide' },
  { id: 13, title: 'Ceremonial Splendor', category: 'Weddings', location: 'Choultry Mandap', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (13).webp', aspect: 'tall' },
  { id: 14, title: 'Regal Stance', category: 'Portraits', location: 'Vintage Set', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (14).webp', aspect: 'tall' },
  { id: 15, title: 'Twilight Promise', category: 'Weddings', location: 'Backwater Sunset', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (15).webp', aspect: 'wide' },
  { id: 16, title: 'Angelic Lullaby', category: 'Baby & Maternity', location: 'Newborn Suite', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (16).webp', aspect: 'tall' },
  { id: 17, title: 'Bridal Warmth', category: 'Weddings', location: 'Bridal Chamber', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (17).webp', aspect: 'wide' },
  { id: 18, title: 'Monochrome Soul', category: 'Portraits', location: 'Black Studio', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (18).webp', aspect: 'tall' },
  { id: 19, title: 'Pine Trail Walk', category: 'Weddings', location: 'Ooty Pines', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (19).webp', aspect: 'tall' },
  { id: 20, title: 'Sweet Milestones', category: 'Baby & Maternity', location: 'Cake Smash Studio', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (20).webp', aspect: 'wide' },
  { id: 21, title: 'Festive Sangeet', category: 'Weddings', location: 'Arena Stage', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (21).webp', aspect: 'tall' },
  { id: 22, title: 'Celebration Glow', category: 'Weddings', location: 'Ballroom Hall', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (22).webp', aspect: 'wide' },
  { id: 23, title: 'Classic Elegance', category: 'Portraits', location: 'Studio Canvas', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1(22).webp', aspect: 'tall' },
  { id: 24, title: 'Regal Heritage', category: 'Weddings', location: 'Royal Lawn', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1 (23).jpeg', aspect: 'wide' },
  { id: 25, title: 'Heritage Essence', category: 'Weddings', location: 'Palace Courtyard', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1(23).webp', aspect: 'tall' },
  { id: 26, title: 'Eternal Radiance', category: 'Weddings', location: 'Grand Mandapam', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/1(24).webp', aspect: 'wide' },
  { id: 27, title: 'Intimate Whispers', category: 'Weddings', location: 'Heritage Lawn', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/CP-1130.webp', aspect: 'tall' },
  { id: 28, title: 'Golden Vows', category: 'Weddings', location: 'Palace Corridor', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/IMG_1361.JPG.webp', aspect: 'wide' },
  { id: 29, title: 'Royal Ceremony', category: 'Weddings', location: 'Grand Hall', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/IMG_1566.JPG.webp', aspect: 'tall' },
  { id: 30, title: 'Auspicious Rituals', category: 'Weddings', location: 'Mandap Steps', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/IMG_1578.JPG.webp', aspect: 'wide' },
  { id: 31, title: 'Candid Smiles', category: 'Portraits', location: 'Studio Daylight', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/Z7N_9531_websize.webp', aspect: 'tall' },
  { id: 32, title: 'Timeless Grace', category: 'Portraits', location: 'Fine Art Loft', image: 'https://pub-b0ccb583bc624dbfbd4a27312386356f.r2.dev/images/latest_image/Z7N_9539_websize.webp', aspect: 'wide' }
];

const CATEGORIES = ['All', 'Weddings', 'Portraits', 'Baby & Maternity'];

export default function LatestWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredItems = LATEST_WORK_ITEMS.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Reveal Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.latest-work-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out'
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const [touchStartX, setTouchStartX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (diff > 45) {
      // Swiped Left -> Next
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (diff < -45) {
      // Swiped Right -> Prev
      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="latest-work" ref={sectionRef} className="latest-work-section">
      <div className="container-fluid latest-work-container">
        
        {/* Section Title */}
        <div className="latest-work-header text-center">
          <span className="section-subtitle">FEATURED PORTFOLIO</span>
          <h2 className="latest-work-section-title">Latest Work</h2>
        </div>

        {/* Dynamic Gallery Grid */}
        <div ref={gridRef} className="latest-work-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`latest-work-card ${item.aspect}`}
              onClick={() => setLightboxIndex(index)}
            >
              <div className="card-image-box img-zoom-container">
                <LazyImage src={item.image} alt={item.title || `Latest Work ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>

        {/* View Full Portfolio Link */}
        <div className="text-center mt-5">
          <Link to="/services/wedding" className="explore-all-work-btn">
            <span>EXPLORE ALL SERVICES &amp; GALLERIES</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentItem && (
        <div 
          className="latest-lightbox-overlay" 
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="lightbox-close-btn"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
          >
            <X size={26} />
          </button>

          <button
            className="lightbox-nav-btn nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
            }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={currentItem.image} alt={currentItem.title} className="lightbox-main-img" />
          </div>

          <button
            className="lightbox-nav-btn nav-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
            }}
            aria-label="Next Image"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </section>
  );
}
