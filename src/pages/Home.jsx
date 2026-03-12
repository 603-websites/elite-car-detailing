import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import TrustIndicators from '../components/TrustIndicators';
import WhyElite from '../components/WhyElite';
import GalleryPreview from '../components/GalleryPreview';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title="Home"
        description="Elite Detailing offers professional luxury auto detailing services across New England. Ceramic coating, paint correction, and premium packages for exotic cars and luxury vehicles."
        canonical="https://elite-detailing-website.vercel.app/"
      />
      <Navbar />
      <Hero />
      <FeaturedServices />
      <TrustIndicators />
      <WhyElite />
      <GalleryPreview />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Home;
