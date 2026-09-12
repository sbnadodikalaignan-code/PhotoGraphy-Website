import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const SLIDES = [
  {
    image: '/images/HEROSEACTIONIMAGE/1.webp',
    title: 'A PROMISE, HELD CLOSE',
    tagline: 'BEFORE THE CELEBRATION BEGINS',
    copyTheme: 'copy-ink',
    navTone: 'light',
    overlay: null
  },
  {
    image: '/images/HEROSEACTIONIMAGE/2.webp',
    title: 'GOLDEN HOUR, TWO HEARTS',
    tagline: 'A LOVE STORY LIT BY THE LAST LIGHT',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.7) 100%)'
  },
  {
    image: '/images/HEROSEACTIONIMAGE/3.webp',
    title: 'THE JOY OF US',
    tagline: 'THE LITTLE GLANCES THAT LAST FOREVER',
    copyTheme: 'copy-ink',
    navTone: 'light',
    overlay: null
  },
  {
    image: '/images/HEROSEACTIONIMAGE/4.webp',
    title: 'A NIGHT MADE OF MAGIC',
    tagline: 'WHERE LOVE DANCES THROUGH THE RAIN',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.72) 100%)'
  },
  {
    image: '/images/HEROSEACTIONIMAGE/5.webp',
    title: 'HEARTS IN HARMONY',
    tagline: 'THE MOST BEAUTIFUL MOMENTS ARE UNSCRIPTED',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.68) 100%)'
  },
  {
    image: '/images/HEROSEACTIONIMAGE/6.webp',
    title: 'JOY, IN ITS PUREST FORM',
    tagline: 'REAL LAUGHTER. REAL LOVE. FOREVER REMEMBERED.',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.68) 100%)'
  },
  {
    image: '/images/HEROSEACTIONIMAGE/7.webp',
    title: 'JOY TAKES THE STAGE',
    tagline: 'A CELEBRATION LIT WITH LAUGHTER',
    copyTheme: 'copy-light',
    navTone: 'dark',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.66) 100%)'
  },
  {
    image: '/images/HEROSEACTIONIMAGE/8.webp',
    title: 'YOUR STORY, BEAUTIFULLY YOURS',
    tagline: 'TRADITIONS HELD CLOSE. MEMORIES MADE NEW.',
    copyTheme: 'copy-ink',
    navTone: 'dark',
    overlay: null
  },
  {
    image: '/images/HEROSEACTIONIMAGE/9.webp',
    title: 'FOREVER BEGINS HERE',
    tagline: 'TWO SOULS, ONE BEAUTIFUL JOURNEY',
    copyTheme: 'copy-ink',
    navTone: 'dark',
    overlay: null
  }
];

export default function HeroSlider({ onToneChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
    onToneChange?.(SLIDES[currentIndex].navTone);
  }, [currentIndex, onToneChange]);

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

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section id="home" className={`hero-slider-section ${SLIDES[currentIndex].copyTheme}`}>
      <div 
        className="slider-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`slide-item ${slide.copyTheme} ${index === currentIndex ? 'slide-active' : ''}`}
            style={{ backgroundImage: `${slide.overlay ? `${slide.overlay}, ` : ''}url(${slide.image})` }}
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

    </section>
  );
}
