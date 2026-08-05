import React from 'react';
import './Stories.css';

const BLOGS = [
  {
    id: 1,
    title: '10 Crucial Tips for Your Dream Pre-Wedding Shoot',
    date: 'July 24, 2026',
    author: 'Maya',
    image: '/images/WEEDING/PREWEEDING/2.webp',
    excerpt: 'Planning your pre-wedding shoot can be overwhelming. From picking outfits to styling locations, here is our ultimate guide to making it perfect.'
  },
  {
    id: 2,
    title: 'Chasing the Light: Destination Wedding in Udaipur',
    date: 'June 18, 2026',
    author: 'Rahul',
    image: '/images/WEEDING/4.webp',
    excerpt: 'Udaipur offers a royal backdrop unlike any other. We share our experience navigating the palaces, lakes, and lighting setups.'
  },
  {
    id: 3,
    title: 'The Art of Capture: Why Candid Shots Matter Most',
    date: 'May 05, 2026',
    author: 'Rahul & Maya',
    image: '/images/WEEDING/5.webp',
    excerpt: 'While portraits are timeless, candid moments hold the true emotions of your wedding day. Discover our approach to capturing unposed magic.'
  }
];

export default function Stories() {
  return (
    <section id="blog" className="section section-dark">
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">INSIGHTS &amp; INSPIRED WRITING</span>
          <h2 className="section-title">The Photography Blog</h2>
        </div>

        <div className="blog-grid">
          {BLOGS.map(blog => (
            <article key={blog.id} className="blog-card">
              <div className="blog-image-wrapper img-zoom-container">
                <img src={blog.image} alt={blog.title} />
                <span className="blog-date">{blog.date}</span>
              </div>
              
              <div className="blog-body">
                <span className="blog-author">Written by {blog.author}</span>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.excerpt}</p>
                <button className="read-more-btn">READ STORY</button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
