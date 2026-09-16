import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIAL_ITEMS = [
  {
    id: 1,
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/4.webp',
    quote: '"They make you look confident in front of the camera!"',
    rating: 5,
    names: 'Keerthana & Ajay',
    location: '(UK/ Chennai)',
  },
  {
    id: 2,
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/8.webp',
    quote: '"The most Punctual, Responsive & Reliable team we ever met"',
    rating: 5,
    names: 'Yusra & Shuja',
    location: '(Chicago, United States)',
  },
  {
    id: 3,
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/6.webp',
    quote: '"They capture true emotions and love"',
    rating: 5,
    names: 'Raizel & Ashwin',
    location: '(Chennai/ US)',
  },
  {
    id: 4,
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/2.webp',
    quote: '"Fun to work with!"',
    rating: 5,
    names: 'Reza & Paula',
    location: '(Bangalore)',
  },
];

export default function Testimonials() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-card-item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={rootRef} className="testimonials-section">
      <div className="testimonials-container">

        {/* Main Title matching exact screenshot */}
        <h2 className="testimonials-title">TESTIMONIALS</h2>

        {/* 4 Circular Cards Grid */}
        <div className="testimonials-grid">
          {TESTIMONIAL_ITEMS.map((item) => (
            <div key={item.id} className="testimonial-card-item">

              {/* Circular Couple Photo */}
              <div className="testimonial-avatar-wrapper img-zoom-container">
                <img src={item.image} alt={`${item.names} Testimonial`} className="testimonial-avatar-img" />
              </div>

              {/* Quote */}
              <p className="testimonial-quote-text">{item.quote}</p>

              {/* Gold Star Ratings */}
              <div className="testimonial-stars-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} className="star-icon-gold" fill="#eab308" stroke="#eab308" />
                ))}
              </div>

              {/* Client Names & Location */}
              <span className="testimonial-client-meta">
                {item.names} <span className="location-text">{item.location}</span>
              </span>

            </div>
          ))}
        </div>

        {/* Bottom Dark Button matching screenshot */}
        <div className="testimonials-btn-wrapper">
          <button className="more-reviews-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            More Reviews
          </button>
        </div>

      </div>
    </section>
  );
}
