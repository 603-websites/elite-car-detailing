import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroCarImg from '../assets/images/cars/car5.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10"></div>

      {/* Video Background - Falls back to poster image */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroCarImg}
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Fallback image for browsers that don't support video */}
        <img
          src={heroCarImg}
          alt="Luxury vehicle detailing"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="sync"
          fetchpriority="high"
          style={{ display: 'none' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Hero Content - FRD: Mobile-first responsive */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <motion.div
            className="max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Accent Line - FRD: Touch-friendly sizing */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-luxury-gold mb-4 sm:mb-6"
            ></motion.div>

            {/* Main Heading - FRD: H1 28px-36px on mobile */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-white mb-3 sm:mb-4 md:mb-6 leading-tight"
            >
              Precision Detailing
              <span className="block text-luxury-gold mt-1 sm:mt-2">
                For Elite Vehicles
              </span>
            </motion.h1>

            {/* Tagline - FRD: 16px minimum body text */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-base sm:text-lg md:text-xl text-luxury-white/80 mb-6 sm:mb-8 md:mb-10 leading-relaxed"
            >
              Premium auto detailing services across New England. Ceramic coating, paint correction, and meticulous care for exotic cars and luxury vehicles.
            </motion.p>

            {/* CTA Buttons - FRD: Full width on mobile, min 44px tap target */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/booking" className="w-full sm:w-auto">
                <button className="btn-primary w-full sm:w-auto min-h-[44px]">
                  Book Now
                </button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <button className="btn-secondary w-full sm:w-auto min-h-[44px]">
                  Our Services
                </button>
              </Link>
            </motion.div>

            {/* Trust Indicators - FRD: Single col on mobile, 3 cols on tablet+ */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
            >
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">5</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  States Served
                </p>
              </div>
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">5-Star</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  Service
                </p>
              </div>
              <div className="border-l-2 border-luxury-gold pl-3 sm:pl-4 py-2">
                <p className="text-2xl sm:text-3xl font-bold text-luxury-gold">100%</p>
                <p className="text-xs sm:text-sm text-luxury-white/60 uppercase tracking-wider mt-1">
                  Satisfaction
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile (FRD recommendation) */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-luxury-gold text-xs uppercase tracking-widest mb-2">
            Scroll
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
