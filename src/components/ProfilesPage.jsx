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
      // Hero Banner Reveal Animation
      gsap.fromTo('.about-hero-left, .about-hero-right',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

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

      {/* Editorial Warm Beige Header Banner */}
      <section className="about-editorial-hero">
        <div className="about-hero-container">
          <div className="about-hero-left">
            <h1 className="about-hero-title">About Us</h1>
            <span className="about-hero-founded">Founded in 1992</span>
          </div>
          <div className="about-hero-right">
            <p className="about-hero-description">
              This is the space to introduce visitors to your business or brand. Briefly explain who's behind it, what it does and what makes it unique. Share its core values and what your site has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: OUR STORY */}
      <section className="our-story-section">
        <div className="our-story-container">
          <div className="our-story-left">
            <span className="our-story-subtitle">Who We Are</span>
            <h2 className="our-story-title">Our Story</h2>
            
            <div className="our-story-text-group">
              <p className="our-story-paragraph">
                This is the space to introduce the story of your business. Tell visitors how it got started. It's an opportunity for you to describe a special service or product it offers. You can use this section to share your company's history or highlight a particular feature that sets it apart from competitors.
              </p>
              <p className="our-story-paragraph">
                Let the writing speak for itself. Keep a consistent tone and voice throughout the website to stay true to the brand image and give visitors a taste of the company's values and personality.
              </p>
            </div>
          </div>

          <div className="our-story-right">
            <div className="our-story-image-box">
              <img src="\images\nadodikalaignan ceo.webp" alt="Our Story - Stories by Nadodikalaignan" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT CEO / FOUNDER */}
      <section className="profiles-section ceo-section">
        <div className="profiles-container">

          <div className="ceo-grid">
            {/* CEO Image Container */}
            <div className="ceo-card-image img-zoom-container">
              <img src="/images/nadodikalaignan ceo.jpeg" alt="Founder & CEO - Stories by Nadodikalaignan" />
              <div className="ceo-badge-floating">
                <Sparkles size={18} className="badge-icon" />
                <span>FOUNDER &amp; LEAD DIRECTOR</span>
              </div>
            </div>

            {/* CEO Content Details */}
            <div className="ceo-content-block">
              <span className="section-label">ABOUT THE CEO</span>
              <h2 className="ceo-name">Vasanth Chinnasamy</h2>
              <h3 className="ceo-role">Founder &amp; Chief Creative Director</h3>

              <div className="ceo-quote-box">
                <p className="ceo-quote">
                  "Photography isn't about setting up artificial scenes — it's about holding space for genuine emotion, legacy, and human connection."
                </p>
              </div>

              <p className="ceo-bio-text">
                With over 15 years of documentary photography experience across India and international destinations, Vasanth has redefined modern Indian wedding imagery. His distinctive visual language blends fine-art portraiture with candid storytelling.
              </p>

              <p className="ceo-bio-text">
                Under his creative direction, Stories by Nadodikalaignan has captured over 500 iconic celebrations, earning international acclaim for authenticity, rich colors, and timeless emotional depth.
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
            <h2 className="studio-title">Stories by Nadodikalaignan</h2>
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
            <p>A glimpse into our visual storytelling across weddings, portraits, and baby &amp; maternity albums.</p>
          </div>

          <ThreeGallery />

        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
}
