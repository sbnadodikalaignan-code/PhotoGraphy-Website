import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import About from './components/About';
import PortfolioGrid from './components/PortfolioGrid';
import ProfilesSection from './components/ProfilesSection';
import ProfilesPage from './components/ProfilesPage';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function MainLandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <About />
        <PortfolioGrid />
        <ProfilesSection />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
