import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import About from './components/About';
import PortfolioGrid from './components/PortfolioGrid';
import ProfilesSection from './components/ProfilesSection';
import ProfilesPage from './components/ProfilesPage';
import ServicePage from './components/ServicePage';
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/services/pre-wedding" element={<ServicePage serviceId="pre-wedding" />} />
        <Route path="/services/wedding" element={<ServicePage serviceId="wedding" />} />
        <Route path="/services/baby-maternity" element={<ServicePage serviceId="baby-maternity" />} />
        <Route path="/services/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
