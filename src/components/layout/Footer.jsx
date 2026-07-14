import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/5 pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Panel */}
          <div className="space-y-4">
            <Link to="/">
              <Logo showTagline={true} />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Providing expert insurance and investment solutions built on trust and strategic planning.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://www.instagram.com/sk_smartinvestments/" target="_blank" rel="noopener noreferrer" className="p-2 bg-navy-900 rounded-lg hover:text-gold-400 transition-colors"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/sksmart/" target="_blank" rel="noopener noreferrer" className="p-2 bg-navy-900 rounded-lg hover:text-gold-400 transition-colors"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">Insurance</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Health Platinum Cover</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Term Life Elite</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Auto Max Cover</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Safe Haven Home Policy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About SK Smart</Link></li>
              <li><Link to="/careers" className="hover:text-gold-400 transition-colors">Careers & Openings</Link></li>
              <li><Link to="/support" className="hover:text-gold-400 transition-colors">Help & Support</Link></li>
              <li><Link to="/calculator" className="hover:text-gold-400 transition-colors">Premium Calculator</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">Contact Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">1st Floor, M D Plaza, No : 104, W Raja St, Kanchipuram, Tamil Nadu 631502</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gold-400 shrink-0" />
                <span className="text-slate-400">skinvestments2025@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaInstagram className="text-gold-400 shrink-0" />
                <span className="text-slate-400">Open · Closes 6:30 pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SK Smart Investments. All rights reserved. All mock operations are for demo purposes.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
