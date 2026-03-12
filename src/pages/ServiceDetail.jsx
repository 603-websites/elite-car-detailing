import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { serviceData } from '../data/services';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-luxury-black">
      <SEO
        title={service.title}
        description={service.description}
        canonical={`https://elite-detailing-website.vercel.app/services/${slug}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/85 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <Link
              to="/services"
              className="inline-flex items-center text-luxury-gold hover:text-luxury-dark-gold transition-colors mb-6 text-sm uppercase tracking-wider"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-luxury-white mb-4 sm:mb-6 font-heading">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-luxury-white/70 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 sm:py-16 md:py-20 bg-luxury-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* What's Included */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-luxury-white mb-6 font-heading">
                What's Included
              </h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-luxury-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-luxury-white/80 text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing & CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-luxury-dark-gray border border-luxury-gold/20 p-6 sm:p-8 rounded-sm"
            >
              <h3 className="text-xl font-bold text-luxury-white mb-4 font-heading">Pricing</h3>
              <p className="text-3xl sm:text-4xl font-bold text-luxury-gold mb-2">
                {service.price}
              </p>
              <p className="text-luxury-white/50 text-sm mb-6">{service.priceNote}</p>

              {service.packages && (
                <div className="space-y-3 mb-6">
                  {service.packages.map((pkg, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-luxury-gold/10 pb-2">
                      <span className="text-luxury-white/80 text-sm">{pkg.name}</span>
                      <span className="text-luxury-gold font-semibold text-sm">{pkg.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Link
                  to="/booking"
                  className="btn-primary text-center"
                >
                  Book This Service
                </Link>
                <a
                  href="tel:+16032757513"
                  className="btn-secondary text-center"
                >
                  Call 603-275-7513
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-luxury-dark-gray to-luxury-black border-t border-luxury-gold/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-4 font-heading">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-luxury-white/70 mb-8 max-w-2xl mx-auto">
            Contact us for a free consultation and we'll recommend the perfect service for your vehicle.
          </p>
          <Link to="/contact" className="btn-primary">
            Get a Free Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
