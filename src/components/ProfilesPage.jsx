import React, { useEffect, useRef } from 'react';
import { Award, Camera, Heart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import ContactForm from './ContactForm';
import Footer from './Footer';
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
      gsap.fromTo('.about-ceo-header-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-ceo-section',
            start: 'top 82%',
          }
        }
      );

      gsap.fromTo('.about-ceo-photo-wrapper',
        { opacity: 0, scale: 0.94, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-ceo-section',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-ceo-details > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-ceo-card-block',
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

            <div className="our-story-image-mobile-box">
              <img src="https://media.nadodikalaignan.com/images/other/about.jpeg" alt="Our Story - Stories by Nadodikalaignan" />
            </div>
            
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
              <img src="https://media.nadodikalaignan.com/images/other/about.jpeg" alt="Our Story - Stories by Nadodikalaignan" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT CEO (TERRACOTTA CARD) */}
      <section className="about-ceo-section">
        <div className="about-ceo-container">
          <h2 className="about-ceo-header-title">Our CEO</h2>

          <div className="about-ceo-card-block">
            {/* CEO Photo */}
            <div className="about-ceo-photo-wrapper">
              <img
                src="https://media.nadodikalaignan.com/images/other/nadodikalaignan%20ceo.webp"
                alt="Vasanth Chinnasamy - Founder & Chief Creative Director"
              />
            </div>

            {/* CEO Content Details */}
            <div className="about-ceo-details">
              <h3 className="about-ceo-name">Vasanth Chinnasamy</h3>
              <h4 className="about-ceo-role">Founder &amp; Chief Creative Director</h4>

              <p className="about-ceo-bio">
                Under the creative vision of Vasanth Chinnasamy, Stories by Nadodikalaignan has redefined modern wedding and portrait photography. With over 15 years of documentary expertise across India and global destinations, Vasanth brings an artistic lens that captures raw emotion with royal grandeur.
              </p>

              <p className="about-ceo-bio">
                Vasanth leads a dedicated team of master cinematographers, visual directors, and colorists who share an uncompromising commitment to perfection. Every photograph and film is meticulously handcrafted to celebrate the heritage, beauty, and unscripted magic of your journey.
              </p>

              <div className="about-ceo-social-wrap">
                <a
                  href="https://www.instagram.com/nadodikalaignan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ceo-instagram-btn"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>FOLLOW @NADODIKALAIGNAN</span>
                </a>
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

        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
}
