import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp } from '../hooks/useScrollAnimation';
import car3 from '../assets/images/cars/car3.jpg';
import car4 from '../assets/images/cars/car4.jpg';
import car7 from '../assets/images/cars/car7.jpg';

const WhyEliteRow = ({ image, imageAlt, title, description, imageLeft }) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 sm:gap-8 md:gap-12 items-center`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="overflow-hidden rounded-sm border border-luxury-gold/20">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2">
        <div className="w-10 h-0.5 bg-luxury-gold mb-4"></div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-luxury-white mb-3 sm:mb-4 font-heading">
          {title}
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-luxury-white/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const WhyElite = () => {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

  const rows = [
    {
      image: car3,
      imageAlt: 'Meticulous detailing work on a luxury vehicle',
      title: 'Meticulous Attention to Detail',
      description: "Every surface, every crevice, every reflection. We don't cut corners — we polish them.",
      imageLeft: true,
    },
    {
      image: car4,
      imageAlt: 'Premium detailing products and ceramic coatings',
      title: 'Premium Products Only',
      description: 'We use only the finest ceramic coatings, polishes, and protection products trusted by professionals worldwide.',
      imageLeft: false,
    },
    {
      image: car7,
      imageAlt: 'Exotic supercar receiving elite detailing treatment',
      title: 'Your Car, Our Passion',
      description: "From daily drivers to exotic supercars, we treat every vehicle like it's our own.",
      imageLeft: true,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxury-black" aria-labelledby="why-elite-heading">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
            The Elite Difference
          </p>
          <h2 id="why-elite-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-3 sm:mb-4">
            Why <span className="text-luxury-gold">Elite?</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-luxury-gold mx-auto" aria-hidden="true"></div>
        </motion.div>

        {/* Alternating Rows */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {rows.map((row, index) => (
            <WhyEliteRow key={index} {...row} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyElite;
