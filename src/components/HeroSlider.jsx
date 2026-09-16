import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Hls from 'hls.js';
import './HeroSlider.css';

const SLIDES = [
  {
    video: 'https://media.nadodikalaignan.com/images/VIDEO/HEROSEACTIONVIDEO/video.m3u8',
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/1.webp',
    title: '',
    tagline: '',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: null
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/1.webp',
    title: 'A PROMISE, HELD CLOSE',
    tagline: 'BEFORE THE CELEBRATION BEGINS',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.72) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/2.webp',
    title: 'GOLDEN HOUR, TWO HEARTS',
    tagline: 'A LOVE STORY LIT BY THE LAST LIGHT',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.7) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/3.webp',
    title: 'THE JOY OF US',
    tagline: 'THE LITTLE GLANCES THAT LAST FOREVER',
    copyTheme: 'copy-ink',
    navTone: 'light',
    overlay: null
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/4.webp',
    title: 'A NIGHT MADE OF MAGIC',
    tagline: 'WHERE LOVE DANCES THROUGH THE RAIN',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.14) 60%, rgba(0,0,0,0.72) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/5.webp',
    title: 'HEARTS IN HARMONY',
    tagline: 'THE MOST BEAUTIFUL MOMENTS ARE UNSCRIPTED',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.68) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/6.webp',
    title: 'JOY, IN ITS PUREST FORM',
    tagline: 'REAL LAUGHTER. REAL LOVE. FOREVER REMEMBERED.',
    copyTheme: 'copy-light',
    navTone: 'light',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.68) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/7.webp',
    title: 'JOY TAKES THE STAGE',
    tagline: 'A CELEBRATION LIT WITH LAUGHTER',
    copyTheme: 'copy-light',
    navTone: 'dark',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.66) 100%)'
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/8.webp',
    title: 'YOUR STORY, BEAUTIFULLY YOURS',
    tagline: 'TRADITIONS HELD CLOSE. MEMORIES MADE NEW.',
    copyTheme: 'copy-ink',
    navTone: 'dark',
    overlay: null
  },
  {
    image: 'https://media.nadodikalaignan.com/images/HEROSEACTIONIMAGE/9.webp',
    title: 'FOREVER BEGINS HERE',
    tagline: 'TWO SOULS, ONE BEAUTIFUL JOURNEY',
    copyTheme: 'copy-ink',
    navTone: 'dark',
    overlay: null
  }
];

function HeroHlsVideo({ src, poster, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls = null;

    // Explicitly set DOM properties for reliable autoplay on mobile browsers
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS for Safari and iOS WebKit
      video.src = src;
      const onLoadedMetadata = () => {
        video.play().catch(() => {});
      };
      video.addEventListener('loadedmetadata', onLoadedMetadata);

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
      };
    }

    const handleEnded = () => {
      video.play().catch(() => {});
    };
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

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

  // Auto-play for image slides; video plays until user navigates or scrolls
  useEffect(() => {
    if (SLIDES[currentIndex].video) {
      return; // Keep video playing seamlessly without auto-switching
    }
    const autoPlayTimer = setInterval(handleNext, 7000);
    return () => clearInterval(autoPlayTimer);
  }, [currentIndex, handleNext]);

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
          >
            {slide.video ? (
              <div className="hero-video-wrapper">
                <HeroHlsVideo
                  src={slide.video}
                  poster={slide.image}
                  className="hero-video-element"
                />
                {slide.overlay && (
                  <div 
                    className="hero-video-overlay" 
                    style={{ background: slide.overlay }} 
                  />
                )}
              </div>
            ) : (
              <div
                className="hero-image-bg"
                style={{ backgroundImage: `${slide.overlay ? `${slide.overlay}, ` : ''}url(${slide.image})` }}
              />
            )}

            {/* Smooth-appearing content overlay (only when slide has text) */}
            {index === currentIndex && (slide.title || slide.tagline) ? (
              <div className="slide-content">
                {slide.tagline && <span className="slide-tagline animate-slide-up">{slide.tagline}</span>}
                {slide.title && <h2 className="slide-title animate-slide-up-delayed">{slide.title}</h2>}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Navigation Arrows matching style */}
      <button className="slider-arrow arrow-left" onClick={handlePrev} aria-label="Previous Slide">
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>
      <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Next Slide">
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>
    </section>
  );
}
