import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useScrollAnimation, fadeInUp, staggerContainer, scaleIn } from '../hooks/useScrollAnimation';
import car3 from '../assets/images/cars/car3.jpg';

const fadeInUpHero = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

function About() {
  const { ref: coverageRef, isInView: coverageInView } = useScrollAnimation();
  const { ref: whyRef, isInView: whyInView } = useScrollAnimation();
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation();

  const whyCards = [
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Performance-Driven Precision',
      description: 'We approach every detail with the same meticulous standards used in high-performance motorsports.',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Proven Trust',
      description: "With an established presence in the luxury car community, we've already earned credibility.",
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Regional Coverage',
      description: 'Four team members covering all of New England means fast, convenient service wherever you are.',
    },
    {
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-luxury-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: 'Relentless Work Ethic',
      description: 'Our discipline and commitment to excellence goes into every vehicle we service.',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="About Us"
        description="Meet Elite Detailing - a team of passionate professionals bringing precision and dedication to luxury auto detailing across New England."
        canonical="https://elite-detailing-website.vercel.app/about"
      />
      <Navbar />

      {/* Our Story Section - Background spans full width/height */}
      <section className="relative min-h-screen flex items-start py-24 sm:py-32 px-4 sm:px-6">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={car3}
            alt="Luxury vehicle"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Radial Gradient - Glow Effect Around Text Only */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `radial-gradient(
              ellipse 700px 500px at center 30%,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(0, 0, 0, 0.58) 40%,
              transparent 70%
            )`
          }}
        ></div>

        {/* Content positioned in upper third */}
        <motion.div
          className="max-w-3xl mx-auto relative z-20 -mt-5"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeInUpHero}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-6 sm:mb-8 text-center"
          >
            Our Story
          </motion.h1>
          <div className="space-y-5 text-white text-sm sm:text-base md:text-lg">
            <motion.p variants={fadeInUpHero} transition={{ duration: 0.6, ease: 'easeOut' }}>
              What started as a shared passion for cars turned into a business built on precision and dedication. We believe every vehicle deserves the highest standard of care, and that's exactly what we deliver.
            </motion.p>
            <motion.p variants={fadeInUpHero} transition={{ duration: 0.6, ease: 'easeOut' }}>
              Our appreciation for high-performance vehicles comes from understanding what excellence looks like. We've taken that expertise and applied it to professional detailing services across New England.
            </motion.p>
            <motion.p variants={fadeInUpHero} transition={{ duration: 0.6, ease: 'easeOut' }}>
              Between the four of us, we cover Massachusetts, New Hampshire, Rhode Island, Connecticut, and New York. We bring the same dedication and attention to detail to every vehicle we service.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Coverage Map */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-luxury-dark-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 md:mb-12 text-center">
            Coverage Across New England
          </h2>
          <motion.div
            ref={coverageRef}
            variants={staggerContainer}
            initial="hidden"
            animate={coverageInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {[
              { region: 'New York', member: 'Wesley' },
              { region: 'CT & RI', member: 'Dylan' },
              { region: 'NH & MA', member: 'Louis' },
              { region: 'NH & RI', member: 'Vedanth' },
            ].map((area, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-black/50 border border-luxury-gold/20 rounded-lg p-3 sm:p-4 md:p-6 text-center hover:border-luxury-gold transition-colors duration-300"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-heading text-luxury-gold mb-1 sm:mb-2">{area.region}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{area.member}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-8 md:mb-12 text-center">
            Why Choose Us
          </h2>
          <motion.div
            ref={whyRef}
            variants={staggerContainer}
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {whyCards.map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-luxury-dark-gray border border-luxury-gold/20 rounded-lg p-4 sm:p-6 hover:border-luxury-gold transition-colors duration-300"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-heading text-white mb-1 sm:mb-2">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-300">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-r from-luxury-gold/10 to-luxury-gold/5 border-t border-luxury-gold/20">
        <motion.div
          ref={ctaRef}
          variants={fadeInUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
            Ready to Experience Elite Detailing?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8">
            Let us bring our precision and passion to your vehicle.
          </p>
          <a
            href="/booking"
            className="inline-block bg-luxury-gold text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-luxury-gold/90 transition-colors text-sm sm:text-base md:text-lg"
          >
            Schedule Your Service
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
