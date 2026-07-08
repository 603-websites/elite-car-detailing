import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  // Static year calculation - no need for useEffect
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxury-dark-gray border-t border-luxury-gold/20">
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-16">
        <div className="grid md:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl text-luxury-gold mb-4">Elite Detailing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium automotive detailing services for discerning clients across New England and New York.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-luxury-gold transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Auto Detailing</li>
              <li>Ceramic Coating</li>
              <li>Paint Correction</li>
              <li>Interior Restoration</li>
              <li>Paint Protection Film</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>New England & New York</li>
              <li className="mt-3">
                <a href="mailto:hello@websiteupgraderpro.com" className="hover:text-luxury-gold transition-colors">
                  hello@websiteupgraderpro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-luxury-gold/10 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {year} Elite Detailing. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</Link>
            <a
              href="https://www.websiteupgraderpro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-luxury-gold transition-colors"
            >
              Made by Website Upgraders
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
