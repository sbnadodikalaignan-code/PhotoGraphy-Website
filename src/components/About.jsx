import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        {/* Main Editorial Header */}
        <div className="about-editorial-header">
          <h2 className="editorial-title">
            <span>OFF-BEAT,</span>
            <span>DOCUMENTARY</span>
            <span>STORIES MADE</span>
            <span>WITH LOVE.</span>
          </h2>
        </div>

        {/* 3-Column Staggered Clickable Grid */}
        <div className="about-editorial-grid">

          {/* Column 1: Wedding Photography */}
          <Link to="/services/wedding" className="editorial-column col-left editorial-card-link">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/WEEDING/1.webp" alt="Wedding Photography by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Wedding Photography</h3>
          </Link>

          {/* Column 2: Pre Wedding Photography */}
          <Link to="/services/pre-wedding" className="editorial-column col-center editorial-card-link">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/WEEDING/HEROSEACTIONIMAGE/9.webp" alt="Pre Wedding Photography by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Pre Wedding Photography</h3>
          </Link>

          {/* Column 3: Baby & Maternity */}
          <Link to="/services/baby-maternity" className="editorial-column col-right editorial-card-link">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/BABYIMAGE/8.webp" alt="Baby and Maternity Shoots by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Baby &amp; Maternity</h3>
          </Link>

        </div>

      </div>
    </section>
  );
}
