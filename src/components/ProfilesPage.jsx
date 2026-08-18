import React, { useEffect, useRef } from 'react';
import { Award, Camera, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import ContactForm from './ContactForm';
import Footer from './Footer';
import ThreeGallery from './ThreeGallery';
import './ProfilesPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilesPage() {
  const pageRef = useRef(null);
  const heroBgRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Banner Parallax
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.profiles-hero-banner',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // CEO Section Reveals
      gsap.fromTo('.ceo-card-image',
        { opacity: 0, scale: 0.92, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ceo-section',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.ceo-content-block > *',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ceo-content-block',
            start: 'top 80%',
          }
        }
      );

      // Studio Pillars Reveal
      gsap.fromTo('.studio-pillar-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.studio-pillars-grid',
            start: 'top 80%',
          }
        }
      );



      // Studio Gallery Images Reveal
      gsap.fromTo('.studio-gallery-item',
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.studio-gallery-grid',
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

      {/* Hero Banner */}
      <section className="profiles-hero-banner">
        <div 
          ref={heroBgRef} 
          className="profiles-hero-bg"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,10,12,0.65) 0%, rgba(10,10,12,0.85) 100%), url('/images/WEEDING/HEROSEACTIONIMAGE/1.webp')` }}
        ></div>
        <div className="profiles-hero-content">
          <span className="hero-subtitle-badge">LEADERSHIP &amp; CREATIVE VISION</span>
          <h1 className="profiles-hero-title">Profiles &amp; Studio</h1>
          <div className="hero-divider"></div>
          <p className="profiles-hero-desc">
            Discover the passion behind Nadodikalaignan Photography &mdash; founded on the belief that raw, unscripted moments hold the true majesty of life.
          </p>
        </div>
      </section>

      {/* SECTION 1: ABOUT CEO / FOUNDER */}
      <section className="profiles-section ceo-section">
        <div className="profiles-container">
          
          <div className="ceo-grid">
            {/* CEO Image Container */}
            <div className="ceo-card-image img-zoom-container">
              <img src="/images/WEEDING/HEROSEACTIONIMAGE/3.webp" alt="Founder & CEO - Nadodikalaignan Photography" />
              <div className="ceo-badge-floating">
                <Sparkles size={18} className="badge-icon" />
                <span>FOUNDER &amp; LEAD DIRECTOR</span>
              </div>
            </div>

            {/* CEO Content Details */}
            <div className="ceo-content-block">
              <span className="section-label">ABOUT THE CEO</span>
              <h2 className="ceo-name">Vasanath Kumar</h2>
              <h3 className="ceo-role">Founder &amp; Chief Creative Director</h3>
              
              <div className="ceo-quote-box">
                <p className="ceo-quote">
                  "Photography isn't about setting up artificial scenes — it's about holding space for genuine emotion, legacy, and human connection."
                </p>
              </div>

              <p className="ceo-bio-text">
                With over 15 years of documentary photography experience across India and international destinations, Vasanath has redefined modern Indian wedding imagery. His distinctive visual language blends fine-art portraiture with candid storytelling.
              </p>

              <p className="ceo-bio-text">
                Under his creative direction, Nadodikalaignan Photography has captured over 500 iconic celebrations, earning international acclaim for authenticity, rich colors, and timeless emotional depth.
              </p>

              {/* Accolades & Highlights */}
              <div className="ceo-highlights-grid">
                <div className="highlight-item">
                  <Award className="highlight-icon" size={24} />
                  <div>
                    <h4>15+ Years</h4>
                    <span>Master Craftsmanship</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <Camera className="highlight-icon" size={24} />
                  <div>
                    <h4>500+ Stories</h4>
                    <span>Global Destinations</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <Heart className="highlight-icon" size={24} />
                  <div>
                    <h4>98% Referral</h4>
                    <span>Cherished Worldwide</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>



      {/* SECTION 4: ABOUT STUDIO & PILLARS */}
      <section className="profiles-section studio-section">
        <div className="profiles-container">
          
          <div className="studio-intro-header">
            <span className="section-label">ABOUT THE STUDIO</span>
            <h2 className="studio-title">Nadodikalaignan Photography Studio</h2>
            <p className="studio-subtitle">
              A collective of passionate cinematographers, visual artists, and editors dedicated to capturing extraordinary life journeys.
            </p>
          </div>

          {/* 3 Core Studio Pillars */}
          <div className="studio-pillars-grid">
            <div className="studio-pillar-card">
              <div className="pillar-number">01</div>
              <h3 className="pillar-title">Documentary Realism</h3>
              <p className="pillar-desc">
                We believe the best memories happen naturally. Our unobtrusive approach allows you to remain fully present in your celebration while we capture unscripted magic.
              </p>
            </div>

            <div className="studio-pillar-card">
              <div className="pillar-number">02</div>
              <h3 className="pillar-title">Cinematic Editing</h3>
              <p className="pillar-desc">
                Every frame and film is meticulously color-graded and handcrafted in-house, ensuring tailored color harmonies and heirloom-quality visual standards.
              </p>
            </div>

            <div className="studio-pillar-card">
              <div className="pillar-number">03</div>
              <h3 className="pillar-title">Personal Connection</h3>
              <p className="pillar-desc">
                We take time to understand your personal vibe, family traditions, and unique story, building lasting trust that shines through in your photographs.
              </p>
            </div>
          </div>

          {/* Studio Gallery Showcase - 3D Three.js Interactive Showcase */}
          <div className="studio-gallery-header">
            <h3>Behind the Craft</h3>
            <p>A glimpse into our visual storytelling across weddings, pre-weddings, and baby &amp; maternity albums.</p>
          </div>

          <ThreeGallery />

        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
}
