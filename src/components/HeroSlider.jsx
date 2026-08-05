import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const SLIDES = [
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/1.webp',
    title: 'HUSBAND-WIFE TEAM',
    tagline: 'CREATING BEAUTIFUL STORIES TOGETHER'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/2.webp',
    title: 'CANDID & EMOTIONAL',
    tagline: 'WE CAPTURE SOULS, NOT JUST POSES'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/3.webp',
    title: 'MOMENTS ETERNALIZED',
    tagline: 'TRADITIONS EMBELLISHED IN TIME'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/4.webp',
    title: 'ROYAL CELEBRATIONS',
    tagline: 'CAPTURING THE MAJESTY OF YOUR DAY'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/5.webp',
    title: 'LOVE STORY IN FRAMES',
    tagline: 'DOCUMENTING LIFELONG VOWS'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/6.webp',
    title: 'TIMELESS ELEGANCE',
    tagline: 'EVERY DETAIL HELD FOREVER'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/7.webp',
    title: 'SACRED BOND',
    tagline: 'WHERE DREAMS MERGE INTO REALITY'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/8.webp',
    title: 'CELEBRATING TOGETHERNESS',
    tagline: 'UNFORGETTABLE WEDDING MEMORIES'
  },
  {
    image: '/images/WEEDING/HEROSEACTIONIMAGE/9.webp',
    title: 'JOYFUL JOURNEYS',
    tagline: 'PRESERVING YOUR SPECIAL DAY'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800); // Must match transition time in CSS
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-play
  useEffect(() => {
    const autoPlayTimer = setInterval(handleNext, 6000);
    return () => clearInterval(autoPlayTimer);
  }, [handleNext]);

  return (
    <section id="home" className="hero-slider-section">
      <div className="slider-wrapper">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`slide-item ${index === currentIndex ? 'slide-active' : ''}`}
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.6) 100%), url(${slide.image})` }}
          >
            {/* Smooth-appearing content overlay */}
            {index === currentIndex && (
              <div className="slide-content">
                <span className="slide-tagline animate-slide-up">{slide.tagline}</span>
                <h2 className="slide-title animate-slide-up-delayed">{slide.title}</h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows matching screenshot style */}
      <button className="slider-arrow arrow-left" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>

      {/* Progress / Slide Indicators */}
      <div className="slider-indicators">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              if (isTransitioning || index === currentIndex) return;
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
