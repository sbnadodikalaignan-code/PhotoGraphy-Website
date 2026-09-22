import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const COLUMN_1_ITEMS = [
  {
    id: 'c1-1',
    name: 'Daniel & Alish',
    rating: 5,
    text: '"Pictures, video, song selection, edits, visuals and of course the effort! Hats off ❤️ Every marriage is memorable and it is made even more memorable with your photographs. Especially the family one, even stone heart would melt!"'
  },
  {
    id: 'c1-2',
    name: 'Arshidhha',
    rating: 5,
    text: '"Even recently I just went through all the pics... thank you for making our moment such a beautiful memory ✨❤️ Means a lot to us."'
  },
  {
    id: 'c1-3',
    name: 'Swathika Shankar',
    rating: 4,
    text: '"We have booked them for most of our family events. Very much satisfied with their work and the team is very friendly."'
  },
  {
    id: 'c1-4',
    name: 'Karthik & Pooja',
    rating: 5,
    text: '"From pre-wedding to reception, their dedication and artistry are unmatched. Truly world-class photography and wonderful people to work with."'
  }
];

const COLUMN_2_ITEMS = [
  {
    id: 'c2-1',
    name: 'Dhana Sekar & Kiruthika',
    rating: 5,
    text: '"Marriages are made in heaven and consummated on Earth. Team Nadodikalaignan captured all, even jiffy moments. They made us extremely comfortable in posing frames. All their captures adorned our big day!"'
  },
  {
    id: 'c2-2',
    name: 'Sriram Kannan',
    rating: 4,
    text: '"My friend suggested them and the photo quality they deliver is awesome. Will book them in future instance also. Wonderful experience with the entire team."'
  },
  {
    id: 'c2-3',
    name: 'Sreethi Aravind',
    rating: 5,
    text: '"Thoroughly impressed by their exceptional creativity. Our entire family celebrates the pictures. I highly recommend them to anyone looking for timeless captures!"'
  },
  {
    id: 'c2-4',
    name: 'Sneha & Arvind',
    rating: 5,
    text: '"Every single photograph captures the soul of our celebration. The team was completely unobtrusive yet captured every fleeting smile and tear of joy."'
  }
];

const COLUMN_3_ITEMS = [
  {
    id: 'c3-1',
    name: 'Gloria & Vishnu',
    rating: 5,
    text: '"The team went above and beyond capturing every heartfelt moment. We relive our wedding day every time we look at the photos!"'
  },
  {
    id: 'c3-2',
    name: 'Priya Maghalingam',
    rating: 5,
    text: '"Hiring him was one of the best things I did for my wedding! 🥹 Handcrafted memories, breathtaking candid frames, and timeless visual poetry. Thank you so much!"'
  },
  {
    id: 'c3-3',
    name: 'Surye Prakash',
    rating: 4,
    text: '"Photos are so unique and had an osm experience with their wonderful friendly team.. will highly recommend to everyone seeking stunning memories."'
  },
  {
    id: 'c3-4',
    name: 'Rakesh & Divya',
    rating: 5,
    text: '"Cinematic, emotional, and timeless. Nadodikalaignan delivered far beyond our highest expectations. Blessed to have booked them."'
  }
];

function TestimonialCard({ item }) {
  return (
    <div className="testimonial-vcard">
      <div className="testimonial-vcard-header">
        <h4 className="testimonial-vcard-name">{item.name}</h4>
        <div className="testimonial-vcard-stars" aria-label={`${item.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < item.rating ? '#eab308' : '#e5e7eb'}
              stroke={i < item.rating ? '#eab308' : '#e5e7eb'}
            />
          ))}
        </div>
      </div>

      <p className="testimonial-vcard-text">{item.text}</p>
    </div>
  );
}

export default function Testimonials() {
  // Multiply items in each column so there is never an empty gap or blank space while scrolling
  const col1 = [...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS];
  const col2 = [...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS];
  const col3 = [...COLUMN_3_ITEMS, ...COLUMN_3_ITEMS, ...COLUMN_3_ITEMS, ...COLUMN_3_ITEMS];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-header-container">
        <h2 className="testimonials-title">TESTIMONIALS</h2>
        <p className="testimonials-subtitle">
          Kind words from couples & families we have had the honor to capture
        </p>
      </div>

      {/* 3-Column Seamless Vertical Scrolling Wall */}
      <div className="testimonials-vwall-container" aria-label="Customer Testimonials Wall">
        
        {/* Column 1 - Upward Scroll */}
        <div className="testimonials-vcolumn col-up-1">
          <div className="testimonials-vtrack">
            {col1.map((item, idx) => (
              <TestimonialCard key={`c1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Column 2 - Downward Scroll */}
        <div className="testimonials-vcolumn col-down">
          <div className="testimonials-vtrack">
            {col2.map((item, idx) => (
              <TestimonialCard key={`c2-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Column 3 - Upward Scroll */}
        <div className="testimonials-vcolumn col-up-2">
          <div className="testimonials-vtrack">
            {col3.map((item, idx) => (
              <TestimonialCard key={`c3-${idx}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
