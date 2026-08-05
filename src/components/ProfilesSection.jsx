import React, { useEffect, useRef } from 'react';
import { Award, Camera, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProfilesSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProfilesSection() {
  const rootRef = useRef(null);
  const expRef = useRef(null);
  const eventsRef = useRef(null);
  const couplesRef = useRef(null);
  const destRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated Count-Up Numbers trigger
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 80%',
        onEnter: () => {
          // Count up Experience (0 -> 15)
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              if (expRef.current) {
                const val = Math.floor(this.progress() * 15);
                expRef.current.innerText = `${val}+`;
              }
            }
          });

          // Count up Events (0 -> 500)
          gsap.to({}, {
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function() {
              if (eventsRef.current) {
                const val = Math.floor(this.progress() * 500);
                eventsRef.current.innerText = `${val}+`;
              }
            }
          });

          // Count up Happy Couples (0 -> 98)
          gsap.to({}, {
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              if (couplesRef.current) {
                const val = Math.floor(this.progress() * 98);
                couplesRef.current.innerText = `${val}%`;
              }
            }
          });

          // Count up Destinations (0 -> 50)
          gsap.to({}, {
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function() {
              if (destRef.current) {
                const val = Math.floor(this.progress() * 50);
                destRef.current.innerText = `${val}+`;
              }
            }
          });
        }
      });

      // Cards staggered reveal
      gsap.fromTo('.stat-counter-card',
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.profiles-stats-counter-grid',
            start: 'top 82%',
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="profiles" ref={rootRef} className="profiles-counter-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-intro text-center">
          <span className="section-subtitle subtitle-elegant">OUR MILESTONES &amp; IMPACT</span>
          <h2 className="section-title title-large">Profiles &amp; Statistics</h2>
          <p className="counter-intro-desc">
            A decade and a half of preserving authentic emotions and iconic celebrations.
          </p>
        </div>

        {/* 4-Card Number Counter Grid */}
        <div className="profiles-stats-counter-grid">
          
          <div className="stat-counter-card">
            <div className="stat-icon-wrapper">
              <Award size={26} />
            </div>
            <h3 ref={expRef} className="stat-counter-number">15+</h3>
            <span className="stat-counter-title">Years Experience</span>
            <p className="stat-counter-desc">Pioneering candid documentary photography since 2008</p>
          </div>

          <div className="stat-counter-card">
            <div className="stat-icon-wrapper">
              <Camera size={26} />
            </div>
            <h3 ref={eventsRef} className="stat-counter-number">500+</h3>
            <span className="stat-counter-title">Events &amp; Weddings</span>
            <p className="stat-counter-desc">Iconic celebrations &amp; heirloom stories captured</p>
          </div>

          <div className="stat-counter-card">
            <div className="stat-icon-wrapper">
              <Heart size={26} />
            </div>
            <h3 ref={couplesRef} className="stat-counter-number">98%</h3>
            <span className="stat-counter-title">Happy Couples</span>
            <p className="stat-counter-desc">Word-of-mouth referral &amp; client satisfaction rate</p>
          </div>

          <div className="stat-counter-card">
            <div className="stat-icon-wrapper">
              <Globe size={26} />
            </div>
            <h3 ref={destRef} className="stat-counter-number">50+</h3>
            <span className="stat-counter-title">Global Destinations</span>
            <p className="stat-counter-desc">Shoots across India, Asia &amp; international venues</p>
          </div>

        </div>

        {/* CTA Button to Full Profiles Page */}
        <div className="text-center mt-5">
          <Link to="/profiles" className="view-profiles-cta-btn">
            <span>EXPLORE FULL CEO &amp; STUDIO PROFILES</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
