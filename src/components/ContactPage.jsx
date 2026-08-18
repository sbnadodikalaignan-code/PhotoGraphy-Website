import React from 'react';
import Header from './Header';
import ContactForm from './ContactForm';
import Footer from './Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
