import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation';
import { serviceCards } from '../data/services';
import car5 from '../assets/images/cars/car5.jpg';

const ServiceCard = ({ slug, title, description, image }) => (
  <motion.div
    variants={fadeInUp}
    className="group bg-luxury-dark-gray border border-luxury-gold/10 rounded-sm overflow-hidden hover:border-luxury-gold/40 transition-all duration-500"
  >
    {/* Image */}
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    </div>

    {/* Content */}
    <div className="p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-luxury-white mb-2 font-heading group-hover:text-luxury-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-luxury-white/60 leading-relaxed mb-4">
        {description}
      </p>
      <Link
        to={`/services/${slug}`}
        className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors uppercase text-xs sm:text-sm tracking-wider font-semibold border border-luxury-gold/40 hover:border-luxury-gold px-4 py-2 rounded-sm"
      >
        Learn More
        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </motion.div>
);

const Services = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title="Our Services"
        description="Explore our luxury auto detailing packages. From essential details to concierge-level service, we offer ceramic coating, paint correction, and premium protection for your vehicle."
        canonical="https://elite-detailing-website.vercel.app/services"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/85 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={car5}
            alt="Luxury vehicle detailing"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-20">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-4 font-semibold">
              Premium Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-white mb-4 sm:mb-6 font-heading">
              Our Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-luxury-white/70 leading-relaxed px-2">
              We offer expert vehicle detailing, protection, and restoration services,
              all done with precision and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 sm:mt-8">
              <Link to="/booking" className="btn-primary">
                Book Now
              </Link>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
          >
            {serviceCards.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-luxury-dark-gray to-luxury-black border-t border-luxury-gold/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-4 font-heading">
            Ready to Experience Elite Detailing?
          </h2>
          <p className="text-luxury-white/70 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
            Contact us today for a personalized quote or to schedule your detailing service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get a Free Quote
            </Link>
            <Link to="/booking" className="btn-secondary">
              Schedule Appointment
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
