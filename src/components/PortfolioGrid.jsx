import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LazyImage from './LazyImage';
import './PortfolioGrid.css';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const WEDDING_IMAGE_FILES = [
  '1 (1).webp', '1 (2).webp', '1 (3).webp', '1 (4).webp', '1 (5).webp', '1 (6).webp', '1 (7).webp', '1 (8).webp', '1 (9).webp',
  '1 (10).webp', '1 (11).webp', '1 (12).webp', '1 (13).webp', '1 (14).webp', '1 (15).webp', '1 (16).webp', '1 (17).webp',
  '1 (18).webp', '1 (19).webp', '1 (20).webp', '1 (21).webp', '1 (22).webp', '1 (23).webp', '1 (24).webp', '1 (25).webp',
  '1 (26).webp', '1 (27).webp', '1 (28).webp', '1 (29).webp', '1 (30).webp', '1 (31).webp', '1 (32).webp', '1 (33).webp',
  '1 (34).webp', '1 (35).webp', '1 (36).webp', '1 (37).webp', '1 (38).webp', '1 (39).webp', '1 (40).webp',
  'CP-1028.webp', 'CP-1087.webp', 'CP-1309.webp', 'CP-366.webp', 'IMG_1197.JPG.webp', 'IMG_1942.JPG.webp', 'IMG_2290.JPG.webp',
  '_Z7N5513.webp', '103 (1).webp', '1 (2).jpeg', '1 (3).jpeg'
];

const WEDDING_ITEMS = WEDDING_IMAGE_FILES.map((fileName, index) => ({
  id: index + 1,
  title: `Wedding ${index + 1}`,
  image: `https://media.nadodikalaignan.com/images/WEEDING/${fileName}`,
  size: index % 2 === 0 ? 'size-medium' : 'size-small'
}));

const BABY_IMAGE_FILES = [
  '1 (2).webp', '1 (3).webp', '1 (5).webp', '1 (6).webp', '1 (7).webp', '1 (8).webp',
  '1 (9).webp', '1 (10).webp', '1 (11).webp', '1 (12).webp', '1 (13).webp', '1 (14).webp',
  '1 (15).webp', '1 (16).webp', '1 (17).webp', '1(18).webp'
];

const BABY_ITEMS = BABY_IMAGE_FILES.map((fileName, index) => ({
  id: index + 1,
  title: `Baby & Maternity ${index + 1}`,
  image: `https://media.nadodikalaignan.com/images/BABYIMAGE/${fileName}`,
  size: index % 2 === 0 ? 'size-medium' : 'size-small'
}));

const PORTRAIT_IMAGE_FILES = [
  '1 (1).webp', '1 (2).webp', '1 (3).webp', '1 (4).webp', '1 (5).webp', '1 (6).webp', '1 (7).webp', '1 (8).webp', '1 (9).webp',
  '1 (10).webp', '1 (11).webp', '1 (12).webp', '1 (13).webp', '1 (14).webp', '1 (16).webp', '1 (17).webp', '1 (18).webp',
  '1 (19).webp', '1 (20).webp', '1 (21).webp', '1 (22).webp', '1 (23).webp', '1 (24).webp', '1 (25).webp', '1 (26).webp',
  '1 (27).webp', '1 (28).webp', '1 (29).webp', 'CP-423.webp', 'IMG_0175.JPG (1).webp', 'IMG_0196.JPG.webp'
];

const PORTRAIT_ITEMS = PORTRAIT_IMAGE_FILES.map((fileName, index) => ({
  id: index + 1,
  title: `Portrait ${index + 1}`,
  image: `https://media.nadodikalaignan.com/images/protrate/${fileName}`,
  size: index % 2 === 0 ? 'size-medium' : 'size-small'
}));

export default function PortfolioGrid() {
  const [lightbox, setLightbox] = useState({ category: null, index: null });
  const rootRef = useRef(null);
  const trackContainerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const progressBarRef = useRef(null);

  // Smooth continuous auto-scroll loop for the gallery section
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox.index === null) return;

    const getItems = () => {
      if (lightbox.category === 'wedding') return WEDDING_ITEMS;
      if (lightbox.category === 'baby') return BABY_ITEMS;
      if (lightbox.category === 'portrait') return PORTRAIT_ITEMS;
      return [];
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
    if (lightbox.category === 'wedding') return WEDDING_ITEMS;
    if (lightbox.category === 'baby') return BABY_ITEMS;
    if (lightbox.category === 'portrait') return PORTRAIT_ITEMS;
    return [];
  };

  const activeItems = getActiveItems();
  const currentItem = lightbox.index !== null ? activeItems[lightbox.index] : null;

  return (
    <div ref={rootRef} className="portfolio-multi-wrapper">
      {/* SECTION 1: WEDDING */}
      <section id="wedding" className="portfolio-section-block">
        {/* Parallax Hero Banner using Local WebP file */}
        <div className="portfolio-hero">
          <div
            className="portfolio-hero-bg"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://media.nadodikalaignan.com/images/WEEDING/1 (1).webp')` }}
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
                  <LazyImage src={item.image} alt={item.title || 'Wedding'} className="portfolio-image" />
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
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://media.nadodikalaignan.com/images/BABYIMAGE/1 (8).webp')` }}
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
                  <LazyImage src={item.image} alt={item.title || 'Baby and Maternity'} className="portfolio-image" />
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

      {/* SECTION 4: PORTRAIT SHOOT */}
      <section id="portrait" className="portfolio-section-block">
        {/* Parallax Hero Banner */}
        <div className="portfolio-hero">
          <div
            className="portfolio-hero-bg"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://media.nadodikalaignan.com/images/protrate/1 (13).webp')` }}
          ></div>
          <div className="hero-content hero-title-anim">
            <h2 className="hero-title">Portrait Shoot</h2>
            <div className="hero-divider"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-container">
          <div className="section-intro">
            <span className="section-subtitle subtitle-elegant">EDITORIAL &amp; FINE ART</span>
            <h3 className="section-title title-large">Portrait Portfolio</h3>
          </div>

          <div className="portfolio-masonry-grid portrait-grid">
            {PORTRAIT_ITEMS.map((item, index) => (
              <div
                key={item.id}
                className={`portfolio-card ${item.size}`}
                onClick={() => setLightbox({ category: 'portrait', index })}
              >
                <div className="card-image-container img-zoom-container">
                  <LazyImage src={item.image} alt={item.title || 'Portrait Shoot'} className="portfolio-image" />
                </div>
                {item.title && (
                  <div className="card-overlay">
                    <div className="card-info">
                      <span className="card-category">Portrait Shoot</span>
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
