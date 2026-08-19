import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { useTranslation } from '../context/LanguageContext';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaWhatsapp, FaPhoneAlt, FaArrowRight, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-slate-950 dark:bg-black text-white pt-20 pb-10 overflow-hidden border-t border-white/10 dark:border-white/5 transition-colors duration-300">


      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Panel */}
          <div className="space-y-6">
            <Link to="/" className="inline-block relative group">
              <div className="absolute inset-0 bg-brand-accent/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Logo showTagline={false} />
            </Link>

            <div className="flex flex-wrap gap-3 pt-2">
              {
                [
                  { icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61592452371528", color: "text-blue-600 border-blue-600/50 bg-blue-600/10" },
                  { icon: FaInstagram, url: "https://www.instagram.com/sk_smartinvestments/", color: "text-pink-500 border-pink-500/50 bg-pink-500/10" },
                  { icon: FaYoutube, url: "https://www.youtube.com/@Sksmartinvestments", color: "text-red-500 border-red-500/50 bg-red-500/10" },
                  { icon: FaLinkedin, url: "https://www.linkedin.com/company/sksmartinvestments/", color: "text-blue-500 border-blue-500/50 bg-blue-500/10" },
                  { icon: FaWhatsapp, url: "https://wa.me/919994451300?text=Hi", color: "text-emerald-500 border-emerald-500/50 bg-emerald-500/10" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-300 ${item.color} hover:scale-110`}
                  >
                    <item.icon className="text-base" />
                  </a>
                ))
              }
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              {t('footer_insurance')}
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Health Insurance", path: "/plans?category=Health" },
                { name: "Life Insurance", path: "/plans?category=Life" },
                { name: "General Insurance", path: "/plans?category=General" },
                { name: "Motor Insurance", path: "/plans?category=Motor" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="group flex items-center gap-2 text-sm text-neutral-400 font-medium hover:text-white transition-colors">
                    <span className="text-brand-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <FaArrowRight className="text-[10px]" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              {t('footer_company')}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t('about'), path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: t('book_appointment'), path: "/appointment", highlight: true, noArrow: true },
                { name: t('contact'), path: "/support" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`group flex items-center gap-2 text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-brand-accent hover:text-brand-accent/80 drop-shadow-[0_0_10px_rgba(255,179,0,0.3)]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {!link.noArrow ? (
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-brand-accent transition-all duration-300">
                        <FaArrowRight className="text-[10px]" />
                      </span>
                    ) : (
                      <span className="w-[10px] h-[10px] invisible shrink-0 pointer-events-none" aria-hidden="true" />
                    )}
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              {t('footer_contact')}
            </h4>
            <ul className="space-y-6">
              
              <li>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-brand-accent text-xs" />
                    <p className="font-[900] text-white text-[10px] uppercase tracking-widest">Corporate Office</p>
                  </div>
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/10 shadow-lg group hover:border-brand-accent/50 transition-all duration-300">
                    <iframe
                      src="https://maps.google.com/maps?q=104%20MD%20Plaza%20West%20Raja%20Street%20Kanchipuram%20631502&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="SK Smart Investments Office Location"
                      className="w-full h-full grayscale-[15%] contrast-125 opacity-90 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    />
                    <a 
                      href="https://maps.google.com/?q=104+MD+Plaza+West+Raja+Street+Kanchipuram+631502"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/85 hover:bg-brand-accent hover:text-neutral-950 text-white text-[10px] font-bold rounded-lg border border-white/20 backdrop-blur-md transition-all shadow-md flex items-center gap-1"
                    >
                      <span>Get Directions ↗</span>
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <a href="mailto:skinvestments2025@gmail.com" className="flex items-start gap-4 group cursor-pointer block">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/10 group-hover:border-brand-accent/30 transition-all duration-300 shadow-xl">
                    <FaEnvelope className="text-neutral-400 group-hover:text-brand-accent transition-colors" />
                  </div>
                  <div>
                    <p className="font-[900] text-white text-[10px] uppercase tracking-widest mb-1">{t('footer_email')}</p>
                    <span className="text-sm text-neutral-400 font-medium group-hover:text-white transition-colors block">
                      skinvestments2025@gmail.com
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a href="tel:+919994451300" className="flex items-start gap-4 group cursor-pointer block">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-accent/10 group-hover:border-brand-accent/30 transition-all duration-300 shadow-xl">
                    <FaPhoneAlt className="text-neutral-400 group-hover:text-brand-accent transition-colors" />
                  </div>
                  <div>
                    <p className="font-[900] text-white text-[10px] uppercase tracking-widest mb-1">Phone Hotline</p>
                    <span className="text-sm text-neutral-400 font-medium group-hover:text-white transition-colors block font-sans">
                      +91 99944 51300
                    </span>
                  </div>
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-neutral-500 font-medium tracking-wide">
            {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
