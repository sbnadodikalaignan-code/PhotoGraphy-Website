import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import About from './components/About';
import ProfilesSection from './components/ProfilesSection';
import ProfilesPage from './components/ProfilesPage';
import ServicePage from './components/ServicePage';
import ContactPage from './components/ContactPage';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function MainLandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <About />
        <ProfilesSection />
        <Testimonials />
        <FAQ />
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services/pre-wedding" element={<ServicePage serviceId="pre-wedding" />} />
        <Route path="/services/wedding" element={<ServicePage serviceId="wedding" />} />
        <Route path="/services/baby-maternity" element={<ServicePage serviceId="baby-maternity" />} />
        <Route path="/services/:serviceId" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
