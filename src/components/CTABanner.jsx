import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp } from '../hooks/useScrollAnimation';
import car8 from '../assets/images/cars/car8.jpg';

const CTABanner = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={car8}
          alt=""
          className="w-full h-full object-cover object-center"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-luxury-black/80"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-luxury-white mb-4 sm:mb-6 font-heading">
            Ready to Transform{' '}
            <span className="text-luxury-gold">Your Vehicle?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-luxury-white/80 mb-8 sm:mb-10 leading-relaxed">
            Book your premium detailing service today and experience the Elite difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/booking" className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto min-h-[44px]">
                Book Now
              </button>
            </Link>
            <a href="tel:+16032757513" className="w-full sm:w-auto">
              <button className="btn-secondary w-full sm:w-auto min-h-[44px]">
                Call Us
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
