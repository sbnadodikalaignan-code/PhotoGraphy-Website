import React from 'react';
import Header from './Header';
import ContactForm from './ContactForm';
import Footer from './Footer';
import { useSEO } from '../hooks/useSEO';

export default function ContactPage() {
  useSEO({
    title: 'Contact Stories by Nadodikalaignan | Book Luxury Wedding Photography',
    description: 'Inquire for luxury wedding photography, fine-art portraits, and cinematic films. Reach out directly via WhatsApp, Instagram DM, or phone to reserve your dates.',
    canonical: '/contact',
    ogImage: 'https://media.nadodikalaignan.com/images/other/about.jpeg'
  });

  return (
    <>
      <Header />
      <main>
        <ContactForm asH1={true} />
      </main>
      <Footer />
    </>
  );
}
