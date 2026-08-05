import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">

        {/* Main Editorial Header from user screenshot */}
        <div className="about-editorial-header">
          <h2 className="editorial-title">
            <span>OFF-BEAT,</span>
            <span>DOCUMENTARY</span>
            <span>STORIES MADE</span>
            <span>WITH LOVE.</span>
          </h2>
        </div>

        {/* 3-Column Staggered Grid */}
        <div className="about-editorial-grid">

          {/* Column 1: Wedding Photography */}
          <div className="editorial-column col-left">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/WEEDING/1.webp" alt="Wedding Photography by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Wedding Photography</h3>
            <p className="editorial-col-desc">
              From our first wedding in 2008, we've pioneered candid, documentary and modern Indian wedding photography. No awkward or cheesy poses – we'd love for you to just be you while we quietly photograph the moments that matter.
            </p>
          </div>

          {/* Column 2: Pre Wedding Photography */}
          <div className="editorial-column col-center">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/WEEDING/HEROSEACTIONIMAGE/9.webp" alt="Pre Wedding Photography by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Pre Wedding Photography</h3>
            <p className="editorial-col-desc">
              Pre-wedding shoots are your chance to unwind, get comfortable in front of the camera and capture the anticipation of your big day. These cinematic, story-driven shoots are all about emotion, romance and pure joy.
            </p>
          </div>

          {/* Column 3: Baby & Maternity */}
          <div className="editorial-column col-right">
            <div className="editorial-image-wrapper img-zoom-container">
              <img src="/images/BABYIMAGE/8.webp" alt="Baby and Maternity Shoots by Nadodikalaignan" />
            </div>
            <h3 className="editorial-col-title">Baby &amp; Maternity</h3>
            <p className="editorial-col-desc">
              Tiny hands, precious smiles, and unforgettable first moments—every milestone deserves to be cherished forever. From newborn cuddles to playful birthday celebrations, we capture your little one's journey with love, care, and creativity. Come, let's create beautiful memories you'll treasure for a lifetime.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
