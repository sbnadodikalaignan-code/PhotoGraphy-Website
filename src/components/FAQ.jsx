import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'What is your primary photography style?',
    answer: 'We specialize in a blend of documentary/candid storytelling and editorial wedding photography. We focus on capturing real emotions, unposed joy, and tiny details that define your day, rather than directing stiff poses.'
  },
  {
    id: 2,
    question: 'Do you travel for destination weddings or editorial shoots?',
    answer: 'Absolutely! We love traveling. Whether it is a beach wedding in Goa, a royal celebration in Udaipur, or an international location, we are ready to pack our bags and document your story anywhere in the world.'
  },
  {
    id: 3,
    question: 'How long does it take to deliver the final photographs and films?',
    answer: 'We deliver a "first-look" set of about 30-40 edited highlights within 7 days of the event so you can share them. The complete gallery of fully edited high-resolution images takes between 8 to 10 weeks.'
  },
  {
    id: 4,
    question: 'Can we customize our photography packages?',
    answer: 'Yes! Every wedding is unique. While we offer a set of base packages, we are happy to customize any package to align with your events, durations, and additional requirements (e.g., drone shots, print albums).'
  },
  {
    id: 5,
    question: 'Do you provide print albums, and how does that process work?',
    answer: 'Yes, we design premium, custom-made leather or linen-bound hardbound albums. You get to select your favorite photos from the final gallery, and we handle layout design and high-quality printing.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="faq-layout">
          <div className="faq-content-column">
            <div className="section-title-wrapper faq-title-wrapper">
              <span className="section-subtitle">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>

            <div className="faq-wrapper">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`faq-item ${isOpen ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleFAQ(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question">{item.question}</span>
                      <ChevronDown className={`faq-icon ${isOpen ? 'rotate' : ''}`} size={20} strokeWidth={1.5} />
                    </button>
                    
                    <div className={`faq-answer-container ${isOpen ? 'show' : ''}`}>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="faq-portrait-space">
            <img src="/images/other/faq.jpg" alt="Stories by Nadodikalaignan portrait" />
          </div>
        </div>
      </div>
    </section>
  );
}
