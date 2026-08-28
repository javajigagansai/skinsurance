import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { useTranslation } from '../context/LanguageContext';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaWhatsapp, FaPhoneAlt, FaArrowRight, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-slate-950 dark:bg-black text-white pt-10 pb-6 overflow-hidden border-t border-white/10 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-8">

          {/* Brand Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start items-start gap-4">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img
                src="/logo.png"
                alt="SK Smart Investments Logo"
                className="h-14 sm:h-16 md:h-[64px] w-auto object-contain shrink-0"
              />
              <div className="flex flex-col text-left justify-center leading-none">
                <svg viewBox="0 0 240 28" className="h-9 sm:h-10 md:h-11 w-auto select-none" aria-label="SK Smart Investments - Insurance and Investments Specialist">
                  <text 
                    x="0" 
                    y="13" 
                    className="fill-[#ef233c]" 
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14.5px', fontWeight: 900 }}
                    textLength="240" 
                    lengthAdjust="spacing"
                  >
                    SK SMART INVESTMENTS
                  </text>
                  <text 
                    x="0" 
                    y="26" 
                    className="fill-neutral-300" 
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '8.8px', fontWeight: 800 }}
                    textLength="240" 
                    lengthAdjust="spacing"
                  >
                    INSURANCE AND INVESTMENTS SPECIALIST
                  </text>
                </svg>
              </div>
            </Link>

            <div className="flex items-center flex-wrap gap-2.5">
              {[
                { name: "Facebook", icon: FaFacebook, url: "https://www.facebook.com/profile.php?id=61592452371528", color: "text-blue-500 hover:text-white border-blue-500/30 bg-blue-500/10 hover:bg-blue-600" },
                { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/sk_smartinvestments/", color: "text-pink-500 hover:text-white border-pink-500/30 bg-pink-500/10 hover:bg-pink-600" },
                { name: "YouTube", icon: FaYoutube, url: "https://www.youtube.com/@Sksmartinvestments", color: "text-red-500 hover:text-white border-red-500/30 bg-red-500/10 hover:bg-red-600" },
                { name: "LinkedIn", icon: FaLinkedin, url: "https://www.linkedin.com/company/sksmartinvestments/", color: "text-sky-500 hover:text-white border-sky-500/30 bg-sky-500/10 hover:bg-sky-600" },
                { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/919994451300?text=Hi", color: "text-emerald-500 hover:text-white border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-600" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 ${item.color} shadow-sm hover:scale-105 active:scale-95`}
                >
                  <item.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              {t('footer_insurance')}
            </h4>
            <ul className="space-y-3.5">
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

          {/* Company Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              {t('footer_company')}
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: t('about'), path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: t('book_appointment'), path: "/appointment", highlight: true, noArrow: true },
                { name: t('contact'), path: "/support" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`group flex items-center gap-2 text-sm font-medium transition-colors ${link.highlight
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

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-[900] text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>Contact Us</span>
            </h4>

            <div className="space-y-4">

              {/* Corporate Office & Map */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-white">
                  <FaMapMarkerAlt className="text-brand-accent text-xs shrink-0" />
                  <p className="font-[900] text-white text-[11px] uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
                    Corporate Office
                  </p>
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
                    className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/85 hover:bg-brand-accent hover:text-neutral-950 text-white text-[10px] font-bold rounded-lg border border-white/20 backdrop-blur-md transition-all shadow-md flex items-center gap-1 font-['Plus_Jakarta_Sans',sans-serif]"
                  >
                    <span>Get Directions ↗</span>
                  </a>
                </div>
              </div>

              {/* Action Icons Directly Below Map */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="mailto:skinvestments2025@gmail.com"
                  title="Send Email: skinvestments2025@gmail.com"
                  aria-label="Send Email"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-accent/15 hover:border-brand-accent/40 text-neutral-300 hover:text-brand-accent transition-all duration-300 group shadow-sm"
                >
                  <FaEnvelope className="text-sm text-neutral-400 group-hover:text-brand-accent transition-colors" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">Email</span>
                </a>

                <a
                  href="tel:+919994451300"
                  title="Call Hotline: +91 99944 51300"
                  aria-label="Call Hotline"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-brand-accent/15 hover:border-brand-accent/40 text-neutral-300 hover:text-brand-accent transition-all duration-300 group shadow-sm"
                >
                  <FaPhoneAlt className="text-xs text-neutral-400 group-hover:text-brand-accent transition-colors" />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">Call</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-neutral-400 font-medium tracking-wide">
            {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
