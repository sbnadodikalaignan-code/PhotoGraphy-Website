import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import './About.css';

const CATEGORIES = [
  {
    id: 'weddings',
    title: 'Weddings',
    path: '/work/weddings',
    image: 'https://media.nadodikalaignan.com/images/WEEDING/1 (2).webp',
    alt: 'Weddings photography and films by Stories by Nadodikalaignan'
  },
  {
    id: 'events',
    title: 'Events',
    path: '/work/events',
    image: 'https://media.nadodikalaignan.com/images/events seaction/1 (1).webp',
    alt: 'Events photography and films by Stories by Nadodikalaignan'
  },
  {
    id: 'portraits',
    title: 'Portraits',
    path: '/work/portraits',
    image: 'https://media.nadodikalaignan.com/images/protrate/1 (1).webp',
    alt: 'Portraits photography by Stories by Nadodikalaignan'
  },
  {
    id: 'toddlers',
    title: 'Toddlers',
    path: '/work/toddlers',
    image: 'https://media.nadodikalaignan.com/images/BABYIMAGE/1 (3).webp',
    alt: 'Toddlers photography by Stories by Nadodikalaignan'
  }
];

export default function About() {
  return (
    <section id="about" className="section services-category-section">
      <div className="container">

        {/* Small Studio Introduction Header */}
        <div className="services-intro-header text-center">
          <h1 className="services-intro-title">
            Let us capture the real story
          </h1>
        </div>

        {/* Compact 4-Column Category Cards Grid */}
        <div className="category-cards-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.path} className="category-card-item">
              <div className="category-image-wrapper">
                <LazyImage src={cat.image} alt={cat.alt} />
              </div>
              <h3 className="category-card-title">{cat.title}</h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
