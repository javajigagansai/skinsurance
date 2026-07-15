import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useTranslation } from '../../context/LanguageContext';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/5 pt-12 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Panel */}
          <div className="space-y-4">
            <Link to="/">
              <Logo showTagline={false} />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://www.instagram.com/sk_smartinvestments/" target="_blank" rel="noopener noreferrer" className="p-2 bg-navy-900 rounded-lg hover:text-gold-400 transition-colors"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/sksmart/" target="_blank" rel="noopener noreferrer" className="p-2 bg-navy-900 rounded-lg hover:text-gold-400 transition-colors"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">{t('footer_insurance')}</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Health Platinum Cover</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Term Life Elite</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Auto Max Cover</Link></li>
              <li><Link to="/plans" className="hover:text-gold-400 transition-colors">Safe Haven Home Policy</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">{t('footer_company')}</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">{t('about')}</Link></li>
              <li><Link to="/support" className="hover:text-gold-400 transition-colors">{t('contact')}</Link></li>
              <li><Link to="/calculator" className="hover:text-gold-400 transition-colors">{t('calc')}</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-gold-400 pl-2">{t('footer_contact')}</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gold-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white text-[11px]">Corporate Office</p>
                  <span className="text-slate-400 mt-0.5 block"># 104, MD Plaza, 1st Floor, West Raja Street, Kanchipuram - 631502.</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <FaEnvelope className="text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-[11px]">{t('footer_email')}</p>
                  <span className="text-slate-400 mt-0.5 block">skinvestments2025@gmail.com</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 shrink-0 mt-0.5">📞</span>
                <div>
                  <p className="font-semibold text-white text-[11px]">Phone Hotline</p>
                  <span className="text-slate-400 mt-0.5 block">+91 98407 23956</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold-400 shrink-0 mt-0.5">💼</span>
                <div>
                  <p className="font-semibold text-white text-[11px]">Managing Director</p>
                  <span className="text-slate-400 mt-0.5 block">Prakash Gajendiran</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('footer_rights')}</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">{t('footer_privacy')}</a>
            <a href="#" className="hover:underline">{t('footer_terms')}</a>
            <a href="#" className="hover:underline">{t('footer_sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
