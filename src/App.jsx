import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import About from './components/About';
import ProfilesSection from './components/ProfilesSection';
import Testimonials from './components/Testimonials';
import LatestWork from './components/LatestWork';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Lazy-loaded route pages for optimized performance
const ProfilesPage = lazy(() => import('./components/ProfilesPage'));
const ServicePage = lazy(() => import('./components/ServicePage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

function PageLoader() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', gap: '1.2rem', padding: '2rem' }}>
      <img src="/images/logo.png" alt="Loading" style={{ height: '54px', width: 'auto', filter: 'brightness(0)', opacity: 0.85, animation: 'pulseLogo 1.8s ease-in-out infinite' }} />
      <div style={{ width: '32px', height: '32px', border: '2px solid rgba(0,0,0,0.08)', borderTopColor: '#0a0a0c', borderRadius: '50%', animation: 'spin 0.8s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite' }}></div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseLogo { 0%, 100% { opacity: 0.6; transform: scale(0.98); } 50% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

function MainLandingPage() {
  const [heroTone, setHeroTone] = useState('light');

  return (
    <>
      <Header heroTone={heroTone} />
      <main>
        <HeroSlider onToneChange={setHeroTone} />
        <About />
        <LatestWork />
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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work/weddings" element={<ServicePage serviceId="wedding" />} />
          <Route path="/work/events" element={<ServicePage serviceId="events" />} />
          <Route path="/work/portraits" element={<ServicePage serviceId="portrait" />} />
          <Route path="/work/toddlers" element={<ServicePage serviceId="toddlers" />} />
          <Route path="/work/:serviceId" element={<ServicePage />} />
          <Route path="/services/wedding" element={<ServicePage serviceId="wedding" />} />
          <Route path="/services/events" element={<ServicePage serviceId="events" />} />
          <Route path="/services/portrait" element={<ServicePage serviceId="portrait" />} />
          <Route path="/services/toddlers" element={<ServicePage serviceId="toddlers" />} />
          <Route path="/services/baby-maternity" element={<ServicePage serviceId="toddlers" />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
