import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Lazy load pages for code splitting - reduces initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-luxury-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-luxury-white/70 text-sm uppercase tracking-wider">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* Skip link for keyboard navigation - allows users to skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Suspense fallback={<PageLoader />}>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
