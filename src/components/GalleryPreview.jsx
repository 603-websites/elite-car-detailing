import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollAnimation, staggerContainer, scaleIn, fadeInUp } from '../hooks/useScrollAnimation';
import car2 from '../assets/images/cars/car2.jpg';
import car3 from '../assets/images/cars/car3.jpg';
import car4 from '../assets/images/cars/car4.jpg';
import car5 from '../assets/images/cars/car5.jpg';
import car7 from '../assets/images/cars/car7.jpg';
import car8 from '../assets/images/cars/car8.jpg';

const galleryImages = [
  { src: car2, alt: 'Luxury vehicle exterior detail' },
  { src: car3, alt: 'Premium paint correction result' },
  { src: car4, alt: 'Ceramic coating application' },
  { src: car5, alt: 'Exotic car full detail' },
  { src: car7, alt: 'Interior restoration showcase' },
  { src: car8, alt: 'Paint protection film installation' },
];

const GalleryPreview = () => {
  const { ref, isInView } = useScrollAnimation();
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxury-dark-gray" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          variants={fadeInUp}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <p className="text-luxury-gold uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
            Our Work
          </p>
          <h2 id="gallery-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-white mb-3 sm:mb-4">
            Recent <span className="text-luxury-gold">Transformations</span>
          </h2>
          <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-luxury-gold mx-auto" aria-hidden="true"></div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="group relative overflow-hidden rounded-sm border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-56 sm:h-60 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/30 transition-all duration-500"></div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/50 rounded-sm transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link to="/services" className="w-full sm:w-auto inline-block">
            <button className="btn-secondary w-full sm:w-auto">
              View Full Gallery
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
