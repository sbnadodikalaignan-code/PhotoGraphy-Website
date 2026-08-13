import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PortfolioGrid.css';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const PRE_WEDDING_ITEMS = [
  { id: 1, title: 'Golden Hour Embrace', image: '/images/WEEDING/PREWEEDING/1.webp', size: 'size-medium' },
  { id: 2, title: 'Whispers in the Mist', image: '/images/WEEDING/PREWEEDING/2.webp', size: 'size-small' },
  { id: 3, title: 'Sunset Silhouette', image: '/images/WEEDING/PREWEEDING/4.webp', size: 'size-small' },
  { id: 4, title: 'Urban Serenade', image: '/images/WEEDING/PREWEEDING/3.webp', size: 'size-medium' },
  { id: 5, title: 'Cinematic Moments', image: '/images/WEEDING/PREWEEDING/6.webp', size: 'size-medium' },
  { id: 6, title: 'Coastal Romance', image: '/images/WEEDING/PREWEEDING/7.webp', size: 'size-small' },
  { id: 7, title: 'Eternal Promise', image: '/images/WEEDING/PREWEEDING/8.webp', size: 'size-small' },
  { id: 8, title: 'Lakeside Bliss', image: '/images/WEEDING/PREWEEDING/9.webp', size: 'size-medium' }
];

const WEDDING_ITEMS = [
  { id: 1, title: 'Sacred Vows', image: '/images/WEEDING/1.webp', size: 'size-medium' },
  { id: 2, title: 'The Royal Procession', image: '/images/WEEDING/2.webp', size: 'size-small' },
  { id: 3, title: 'Jayamala Joy', image: '/images/WEEDING/4.webp', size: 'size-small' },
  { id: 4, title: 'Bridal Portrait', image: '/images/WEEDING/3.webp', size: 'size-medium' },
  { id: 5, title: 'Heritage Rituals', image: '/images/WEEDING/5.webp', size: 'size-medium' },
  { id: 6, title: 'Ceremonial Splendor', image: '/images/WEEDING/6.webp', size: 'size-small' },
  { id: 7, title: 'Golden Moments', image: '/images/WEEDING/7.webp', size: 'size-small' },
  { id: 8, title: 'Festive Celebration', image: '/images/WEEDING/8.webp', size: 'size-medium' }
];

const BABY_ITEMS = [
  { id: 1, title: 'First Smiles', image: '/images/BABYIMAGE/1.webp', size: 'size-medium' },
  { id: 2, title: 'Motherhood Grace', image: '/images/BABYIMAGE/2.webp', size: 'size-small' },
  { id: 3, title: 'Tiny Steps', image: '/images/BABYIMAGE/3.webp', size: 'size-small' },
  { id: 4, title: 'Precious Moments', image: '/images/BABYIMAGE/4.webp', size: 'size-medium' },
  { id: 5, title: 'Angelic Dreams', image: '/images/BABYIMAGE/5.webp', size: 'size-medium' },
  { id: 6, title: 'Little Wonder', image: '/images/BABYIMAGE/6.webp', size: 'size-small' },
  { id: 7, title: 'Warm Embrace', image: '/images/BABYIMAGE/7.webp', size: 'size-small' },
  { id: 8, title: 'Sweet Lullaby', image: '/images/BABYIMAGE/8.webp', size: 'size-medium' }
];

export default function PortfolioGrid() {
  const [lightbox, setLightbox] = useState({ category: null, index: null });
  const rootRef = useRef(null);
  const trackContainerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const progressBarRef = useRef(null);

  // Smooth continuous auto-scroll loop for Pre-Wedding section
  useEffect(() => {
    const container = trackContainerRef.current;
    if (!container) return;

    let animId;
    const speed = 1.0; // Smooth 60fps auto-scroll speed

    const step = () => {
      if (!isHoveredRef.current && container) {
        container.scrollLeft += speed;
        // Infinite seamless loop reset
        const max = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= max - 2) {
          container.scrollLeft = 0;
        }
        // Update live progress bar
        if (progressBarRef.current) {
          const pct = max > 0 ? (container.scrollLeft / max) * 100 : 0;
          progressBarRef.current.style.width = `${pct}%`;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP ScrollTrigger reveals and parallax effects for remaining sections
  useEffect(() => {
    // Kill existing triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Staggered reveals for Wedding gallery
    gsap.fromTo('.wedding-grid .portfolio-card',
      { opacity: 0, y: 60, scale: 1.08 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.wedding-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Staggered reveals for Baby & Maternity gallery
    gsap.fromTo('.baby-grid .portfolio-card',
      { opacity: 0, y: 60, scale: 1.08 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.baby-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Real GSAP Parallax Scroll Animation on hero backgrounds and contents
    const blocks = rootRef.current.querySelectorAll('.portfolio-section-block');
    blocks.forEach(block => {
      const bg = block.querySelector('.portfolio-hero-bg');
      const content = block.querySelector('.hero-title-anim');
      const hero = block.querySelector('.portfolio-hero');

      if (bg && hero) {
        gsap.fromTo(bg,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }

      if (content && hero) {
        gsap.fromTo(content,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleScrollNext = () => {
    if (trackContainerRef.current) {
      trackContainerRef.current.scrollBy({ left: 550, behavior: 'smooth' });
    }
  };

  const handleScrollPrev = () => {
    if (trackContainerRef.current) {
      trackContainerRef.current.scrollBy({ left: -550, behavior: 'smooth' });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox.index === null) return;

    const getItems = () => {
      if (lightbox.category === 'pre-wedding') return PRE_WEDDING_ITEMS;
      if (lightbox.category === 'wedding') return WEDDING_ITEMS;
      return BABY_ITEMS;
    };

    const items = getItems();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightbox({ category: null, index: null });
      } else if (e.key === 'ArrowRight') {
        setLightbox(prev => ({ ...prev, index: (prev.index + 1) % items.length }));
      } else if (e.key === 'ArrowLeft') {
        setLightbox(prev => ({ ...prev, index: (prev.index - 1 + items.length) % items.length }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const getActiveItems = () => {
    if (lightbox.category === 'pre-wedding') return PRE_WEDDING_ITEMS;
    if (lightbox.category === 'wedding') return WEDDING_ITEMS;
    if (lightbox.category === 'baby') return BABY_ITEMS;
    return [];
  };

  const activeItems = getActiveItems();
  const currentItem = lightbox.index !== null ? activeItems[lightbox.index] : null;

  return (
    <div ref={rootRef} className="portfolio-multi-wrapper">
      {/* SECTION 1: PRE-WEDDING */}
      <section id="pre-wedding" className="portfolio-section-block">
        {/* Parallax Hero Banner matching Wedding style */}
        <div className="portfolio-hero">
          <div
            className="portfolio-hero-bg"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/WEEDING/PREWEEDING/1.webp')` }}
          ></div>
          <div className="hero-content hero-title-anim">
            <h2 className="hero-title">Pre-Wedding</h2>
            <div className="hero-divider"></div>
          </div>
        </div>

        {/* Gallery Intro & Track Container */}
        <div className="gallery-container prewedding-container">
          <div className="section-intro prewedding-intro">
            <span className="section-subtitle subtitle-elegant">EDITORIAL EXHIBITION</span>
            <h3 className="section-title title-large">Pre-Wedding Stories</h3>
          </div>

          {/* Horizontal Track Container with Auto Scroll */}
          <div
            ref={trackContainerRef}
            className="horizontal-scroll-container"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
          >
            <div className="horizontal-gallery-track">
              {PRE_WEDDING_ITEMS.concat(PRE_WEDDING_ITEMS).map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="editorial-horizontal-card"
                  onClick={() => setLightbox({ category: 'pre-wedding', index: index % PRE_WEDDING_ITEMS.length })}
                >
                  <div className="editorial-img-wrapper img-zoom-container">
                    <img src={item.image} alt={item.title || 'Pre-Wedding'} loading="lazy" className="editorial-horizontal-image" />
                  </div>
                  {item.title && (
                    <div className="card-overlay">
                      <div className="card-info">
                        <span className="card-category">Pre-Wedding</span>
                        <h4 className="card-title">{item.title}</h4>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WEDDING */}
      <section id="wedding" className="portfolio-section-block">
        {/* Parallax Hero Banner using Local WebP file */}
        <div className="portfolio-hero">
          <div
            className="portfolio-hero-bg"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/WEEDING/1.webp')` }}
          ></div>
          <div className="hero-content hero-title-anim">
            <h2 className="hero-title">Wedding</h2>
            <div className="hero-divider"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-container">
          <div className="section-intro">
            <span className="section-subtitle subtitle-elegant">SELECTED WORKS</span>
            <h3 className="section-title title-large">The Wedding Albums</h3>
          </div>

          <div className="portfolio-masonry-grid wedding-grid">
            {WEDDING_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`portfolio-card ${item.size}`}
                onClick={() => setLightbox({ category: 'wedding', index })}
              >
                <div className="card-image-container img-zoom-container">
                  <img src={item.image} alt={item.title || 'Wedding'} loading="lazy" className="portfolio-image" />
                </div>
                {item.title && (
                  <div className="card-overlay">
                    <div className="card-info">
                      <span className="card-category">Wedding</span>
                      <h4 className="card-title">{item.title}</h4>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BABY & MATERNITY */}
      <section id="baby" className="portfolio-section-block">
        {/* Parallax Hero Banner using Local WebP file */}
        <div className="portfolio-hero">
          <div
            className="portfolio-hero-bg"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/BABYIMAGE/8.webp')` }}
          ></div>
          <div className="hero-content hero-title-anim">
            <h2 className="hero-title">Baby &amp; Maternity</h2>
            <div className="hero-divider"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-container">
          <div className="section-intro">
            <span className="section-subtitle subtitle-elegant">SWEET BEGINNINGS</span>
            <h3 className="section-title title-large">Baby &amp; Maternity Albums</h3>
          </div>

          <div className="portfolio-masonry-grid baby-grid">
            {BABY_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`portfolio-card ${item.size}`}
                onClick={() => setLightbox({ category: 'baby', index })}
              >
                <div className="card-image-container img-zoom-container">
                  <img src={item.image} alt={item.title || 'Baby and Maternity'} loading="lazy" className="portfolio-image" />
                </div>
                {item.title && (
                  <div className="card-overlay">
                    <div className="card-info">
                      <span className="card-category">Baby &amp; Maternity</span>
                      <h4 className="card-title">{item.title}</h4>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox / Gallery Overlay */}
      {lightbox.index !== null && currentItem && (
        <div className="lightbox-overlay">
          <button className="lightbox-close" onClick={() => setLightbox({ category: null, index: null })} aria-label="Close Lightbox">
            <X size={28} />
          </button>

          <button
            className="lightbox-arrow arrow-left"
            onClick={() => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + activeItems.length) % activeItems.length }))}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="lightbox-content">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="lightbox-image animate-fade-in"
            />
            <div className="lightbox-caption">
              <span className="lightbox-category">{lightbox.category === 'baby' ? 'BABY & MATERNITY' : lightbox.category.toUpperCase()}</span>
              <h4 className="lightbox-title">{currentItem.title}</h4>
              <span className="lightbox-counter">
                {lightbox.index + 1} / {activeItems.length}
              </span>
            </div>
          </div>

          <button
            className="lightbox-arrow arrow-right"
            onClick={() => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % activeItems.length }))}
            aria-label="Next Slide"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}
