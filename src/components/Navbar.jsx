import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Debounce utility for scroll performance
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const mobileMenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2 },
    }
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: 'easeInOut' },
      opacity: { duration: 0.2, delay: 0.1 },
    }
  }
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' }
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } }
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef(window.scrollY > 50);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Debounced scroll handler for better performance
    const handleScroll = debounce(() => {
      const isScrolled = window.scrollY > 50;
      if (scrollRef.current !== isScrolled) {
        scrollRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    }, 10);

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!mobileMenuOpen) return;

    if (e.key === 'Escape') {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    // Arrow key navigation within menu
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const focusableElements = menuRef.current?.querySelectorAll('a, button');
      if (!focusableElements) return;

      const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
      let nextIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      }

      focusableElements[nextIndex]?.focus();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first menu item when opened
      const firstLink = menuRef.current?.querySelector('a');
      firstLink?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, handleKeyDown]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        mobileMenuOpen
          ? 'bg-luxury-black shadow-lg'
          : scrolled
          ? 'bg-luxury-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center focus-visible:ring-2 focus-visible:ring-luxury-gold rounded">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold">
              <span className="text-luxury-gold">ELITE</span>
              <span className="text-luxury-white"> DETAILING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                role="menuitem"
                className="relative text-luxury-white hover:text-luxury-gold focus-visible:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium focus-visible:ring-2 focus-visible:ring-luxury-gold rounded px-1 py-1 group"
                aria-current={location.pathname === link.href ? 'page' : undefined}
              >
                {link.name}
                {/* Gold underline slide for active link */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-luxury-gold transition-all duration-300 ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link to="/booking">
              <button className="bg-luxury-gold hover:bg-luxury-dark-gold text-luxury-black font-semibold px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider text-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-luxury-gold focus-visible:ring-offset-luxury-black">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button - Enhanced accessibility */}
          <button
            ref={menuButtonRef}
            className="md:hidden text-luxury-white p-2 hover:text-luxury-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Animated with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden absolute left-0 right-0 top-full bg-luxury-black border-t border-luxury-gold/20 shadow-2xl overflow-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-hidden={!mobileMenuOpen}
            >
              <div className="container mx-auto px-4 sm:px-6 py-6">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={link.href}
                        role="menuitem"
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className="block text-luxury-white hover:text-luxury-gold focus-visible:text-luxury-gold transition-colors duration-300 uppercase text-sm tracking-wider font-medium py-3 px-4 rounded hover:bg-luxury-gold/10 focus-visible:bg-luxury-gold/10 border border-transparent hover:border-luxury-gold/30 focus-visible:border-luxury-gold/30"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={location.pathname === link.href ? 'page' : undefined}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    custom={navLinks.length}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="pt-2"
                  >
                    <Link
                      to="/booking"
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block"
                    >
                      <button
                        role="menuitem"
                        className="btn-primary w-full"
                        tabIndex={-1}
                      >
                        Book Now
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
