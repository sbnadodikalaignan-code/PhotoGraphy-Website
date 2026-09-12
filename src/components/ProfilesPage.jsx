import React, { useEffect, useRef } from 'react';
import { Award, Camera, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import ThreeGallery from './ThreeGallery';
import LazyImage from './LazyImage';
import './ProfilesPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilesPage() {
  const pageRef = useRef(null);
  const heroBgRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Banner Reveal Animation
      gsap.fromTo('.about-hero-left, .about-hero-right',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      // CEO Section Reveals
      gsap.fromTo('.about-ceo-photo-wrapper',
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-ceo-section',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-ceo-details > *',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-ceo-section',
            start: 'top 80%',
          }
        }
      );





      // Section Reveals
      gsap.fromTo('.studio-gallery-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.studio-section',
            start: 'top 80%',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="profiles-page-wrapper">
      <Header />

      {/* Editorial Warm Beige Header Banner */}
      <section className="about-editorial-hero">
        <div className="about-hero-container">
          <div className="about-hero-left">
            <h1 className="about-hero-title">About Us</h1>
            <span className="about-hero-founded">13+ Years Successfully Completed</span>
          </div>
          <div className="about-hero-right">
            <p className="about-hero-description">
              Stories by Nadodikalaignan is an award-winning fine-art photography and luxury wedding studio. We craft candid documentary films, royal wedding portraits, and timeless family heirlooms that capture the raw, unscripted beauty of your most cherished celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: OUR STORY */}
      <section className="our-story-section">
        <div className="our-story-container">
          <div className="our-story-content">
            <span className="our-story-subtitle">Who We Are</span>
            
            <div className="our-story-image-mobile-box">
              <LazyImage src="/images/WEEDING/1 (2).jpeg" alt="Our Story - Stories by Nadodikalaignan" />
            </div>

            <h2 className="our-story-title">Our Story</h2>
            
            <div className="our-story-text-group">
              <p className="our-story-paragraph">
                Founded on a passion for authentic human emotion, Stories by Nadodikalaignan began as a journey to capture life as it truly unfolds — unscripted, soulful, and deeply personal. What started as an intimate passion project has grown into an internationally acclaimed photography studio, trusted by hundreds of families to preserve their most sacred milestones.
              </p>
              <p className="our-story-paragraph">
                We believe every couple, portrait subject, and family possesses a unique story that deserves to be told with cinematic artistry. Combining documentary realism with editorial elegance, our team crafts timeless visual legacies that allow you to relive every tear, laughter, and embrace for generations to come.
              </p>
            </div>
          </div>

          <div className="our-story-right">
            <div className="our-story-image-box">
              <LazyImage src="/images/WEEDING/1 (2).jpeg" alt="Our Story - Stories by Nadodikalaignan" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: OUR CEO */}
      <section className="about-ceo-section">
        <div className="about-ceo-container">
          <h2 className="about-ceo-header-title">Our CEO</h2>

          <div className="about-ceo-card-block">
            <div className="about-ceo-photo-wrapper">
              <LazyImage src="/images/nadodikalaignan ceo.webp" alt="Vasanth Chinnasamy - CEO Stories by Nadodikalaignan" />
            </div>

            <div className="about-ceo-details">
              <h3 className="about-ceo-name">Vasanth Chinnasamy</h3>
              <span className="about-ceo-role">Founder &amp; Chief Creative Director</span>

              <p className="about-ceo-bio">
                Under the creative vision of Vasanth Chinnasamy, Stories by Nadodikalaignan has redefined modern wedding and portrait photography. With over 15 years of documentary expertise across India and global destinations, Vasanth brings an artistic lens that captures raw emotion with royal grandeur.
              </p>

              <p className="about-ceo-bio">
                Vasanth leads a dedicated team of master cinematographers, visual directors, and colorists who share an uncompromising commitment to perfection. Every photograph and film is meticulously handcrafted to celebrate the heritage, beauty, and unscripted magic of your journey.
              </p>

              <div className="about-ceo-social-wrap">
                <a 
                  href="https://www.instagram.com/nadodikalaignan?stkn=MWd2M2Q4c3B3d2hpbg%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ceo-instagram-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Follow @nadodikalaignan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 4: ABOUT STUDIO & PILLARS */}
      <section className="profiles-section studio-section">
        <div className="profiles-container">

          {/* Studio Gallery Showcase - 3D Three.js Interactive Showcase */}
          <div className="studio-gallery-header">
            <h3>Behind the Craft</h3>
            <p>A glimpse into our visual storytelling across weddings, portraits, and baby &amp; maternity albums.</p>
          </div>

          <ThreeGallery />

        </div>
      </section>

      <Footer />
    </div>
  );
}
