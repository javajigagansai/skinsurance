import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/contexts/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  FaGlobe, FaChevronDown, FaShieldAlt, FaHeartbeat, 
  FaCar, FaUserShield, FaLayerGroup, FaBriefcase, FaArrowRight 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggeredMenu } from '../components/ui/StaggeredMenu';

export const Navbar = () => {
  const { user, logout, isAuthenticated, isManager } = useAuth();
  const { locale: currentLang, setLocale: setCurrentLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showPlansDropdown, setShowPlansDropdown] = useState(false);
  const plansTimeoutRef = useRef(null);
  const { theme, toggleTheme, isDark: isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const langDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlansMouseEnter = () => {
    if (plansTimeoutRef.current) clearTimeout(plansTimeoutRef.current);
    setShowPlansDropdown(true);
  };

  const handlePlansMouseLeave = () => {
    plansTimeoutRef.current = setTimeout(() => {
      setShowPlansDropdown(false);
    }, 150);
  };

  const languages = [
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'ta', name: 'தமிழ்', label: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు', label: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം', label: 'മലയാളം' },
    { code: 'hi', name: 'हिन्दी', label: 'हिन्दी' }
  ];

  const planCategories = [
    { 
      name: 'All Plans', 
      path: '/plans', 
      icon: FaLayerGroup,
      desc: 'Explore complete portfolio'
    },
    { 
      name: 'Life Insurance', 
      path: '/plans?category=life', 
      icon: FaUserShield,
      desc: 'Term, savings & pensions'
    },
    { 
      name: 'General Insurance', 
      path: '/plans?category=general', 
      icon: FaBriefcase,
      desc: 'Business, asset & fire protection'
    },
    { 
      name: 'Health Insurance', 
      path: '/plans?category=health', 
      icon: FaHeartbeat,
      desc: 'Cashless hospital & critical care'
    },
    { 
      name: 'Motor Insurance', 
      path: '/plans?category=motor', 
      icon: FaCar,
      desc: 'Car, bike & EV comprehensive'
    }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Insurance Plans', path: '/plans', isDropdown: true },
    { name: 'Claims', path: '/claims' },
    { name: 'Contact', path: '/support' }
  ];

  const handleNavClick = (e, path) => {
    if (path === '/#calculator') {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById('calculator');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#calculator');
      }
    }
  };

  const isActive = (path) => {
    if (path === '/plans') {
      return location.pathname === '/plans';
    }
    return location.pathname === path;
  };
  
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled && !isOpen;

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-[20px] shadow-sm dark:shadow-premium-dark border-b border-black/5 dark:border-white/10 py-1 sm:py-1.5"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[52px] sm:min-h-[56px]">
          
          {/* ── Left: Logo & Company Name (Responsive Mobile Scaling) ── */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90 shrink min-w-0 py-0.5">
            <img
              src="/logo.png"
              alt="SK Smart Investments Logo"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col text-left justify-center min-w-0">
              <span className="font-black tracking-tight text-[#d62828] dark:text-[#ef233c] uppercase font-['Plus_Jakarta_Sans',sans-serif] text-[11.5px] xs:text-[13px] sm:text-[15px] md:text-base leading-none truncate">
                SK SMART INVESTMENTS
              </span>
              <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10px] font-extrabold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase leading-tight mt-0.5 sm:mt-1 font-['Plus_Jakarta_Sans',sans-serif] truncate">
                INSURANCE AND INVESTMENTS SPECIALIST
              </span>
            </div>
          </Link>

          {/* ── Center: Compact Main Nav Links (Reduced Text Size) ── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handlePlansMouseEnter}
                    onMouseLeave={handlePlansMouseLeave}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`relative px-2 py-1 text-[11px] xl:text-xs font-bold whitespace-nowrap transition-colors duration-200 rounded-lg flex items-center gap-1 group cursor-pointer ${
                        active 
                          ? 'text-neutral-950 dark:text-brand-accent font-black' 
                          : 'text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-brand-accent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.name}</span>
                      <FaChevronDown className={`text-[8px] transition-transform duration-200 ${showPlansDropdown ? 'rotate-180 text-brand-accent' : ''}`} />
                      {active && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-accent rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Insurance Plans Dropdown Menu */}
                    <AnimatePresence>
                      {showPlansDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-1 w-60 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-1.5 space-y-0.5 text-left"
                        >
                          <div className="px-2.5 py-1 border-b border-slate-100 dark:border-white/5 mb-0.5">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-neutral-500 font-['Plus_Jakarta_Sans',sans-serif]">
                              Insurance Portfolio
                            </span>
                          </div>

                          {planCategories.map((cat) => {
                            const CatIcon = cat.icon;
                            return (
                              <Link
                                key={cat.name}
                                to={cat.path}
                                onClick={() => setShowPlansDropdown(false)}
                                className="flex items-center gap-2.5 p-1.5 rounded-xl transition-all duration-200 hover:bg-amber-50 dark:hover:bg-neutral-800/80 group/item cursor-pointer"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-neutral-800 flex items-center justify-center text-[11px] text-neutral-800 dark:text-brand-accent shrink-0 group-hover/item:bg-brand-accent group-hover/item:text-neutral-950 transition-colors">
                                  <CatIcon />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[11px] font-bold text-neutral-900 dark:text-white group-hover/item:text-amber-800 dark:group-hover/item:text-brand-accent transition-colors truncate">
                                    {cat.name}
                                  </p>
                                  <p className="text-[9px] text-slate-500 dark:text-neutral-400 truncate">
                                    {cat.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative px-2 py-1 text-[11px] xl:text-xs font-bold whitespace-nowrap transition-colors duration-200 rounded-lg group ${
                    active 
                      ? 'text-neutral-950 dark:text-brand-accent font-black' 
                      : 'text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-brand-accent hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Language & Get Started (Reduced Text Size) ── */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            
            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 text-[10.5px] xl:text-xs font-bold transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:text-brand-accent"
                aria-label="Select Language"
              >
                <FaGlobe className="text-[10px] text-brand-accent" />
                <span>{languages.find(l => l.code === currentLang)?.label || 'EN'}</span>
                <FaChevronDown className={`text-[7px] transition-transform duration-200 ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden text-left p-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-2.5 py-1.5 text-[11px] rounded-lg transition-colors text-left font-bold cursor-pointer ${
                          currentLang === lang.code 
                            ? 'text-neutral-950 bg-brand-accent font-black' 
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Started / Dashboard Action Button */}
            <div className="flex items-center">
              {isManager ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-1.5 rounded-lg bg-brand-accent hover:bg-brand-hover text-neutral-950 font-black text-[10px] uppercase tracking-wider shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate('/appointment')}
                  className="px-4 py-1.5 rounded-lg bg-brand-accent hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-neutral-950 font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
                >
                  Get Started
                </button>
              )}
            </div>

          </div>

          {/* ── Mobile Menu Toggle & Drawer ── */}
          <div className="lg:hidden flex items-center shrink-0">
            <StaggeredMenu
              position="right"
              items={[
                { label: 'Home', ariaLabel: 'Go to Home', link: '/' },
                { label: 'About Us', ariaLabel: 'Go to About Us', link: '/about' },
                { label: 'All Insurance Plans', ariaLabel: 'Go to All Insurance Plans', link: '/plans' },
                { label: 'Life Insurance', ariaLabel: 'Go to Life Insurance', link: '/plans?category=life' },
                { label: 'General Insurance', ariaLabel: 'Go to General Insurance', link: '/plans?category=general' },
                { label: 'Health Insurance', ariaLabel: 'Go to Health Insurance', link: '/plans?category=health' },
                { label: 'Motor Insurance', ariaLabel: 'Go to Motor Insurance', link: '/plans?category=motor' },
                { label: 'Claims', ariaLabel: 'Go to Claims', link: '/claims' },
                { label: 'Contact', ariaLabel: 'Go to Contact', link: '/support' }
              ]}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={false}
              menuButtonColor={isDarkMode ? "#ffffff" : "#000000"}
              openMenuButtonColor={isDarkMode ? "#ffffff" : "#000000"}
              changeMenuColorOnOpen={true}
              colors={isDarkMode ? ['#111111', '#FFB300'] : ['#EAEAEA', '#FFB300']}
              accentColor="#FFB300"
              isFixed={true}
              onMenuOpen={() => setIsOpen(true)}
              onMenuClose={() => setIsOpen(false)}
              bottomContent={(closeMenu) => (
                <div className="flex flex-col space-y-5">
                  {/* Mobile Language */}
                  <div className="flex items-center justify-center space-x-6 mb-4">
                    <div className="relative flex justify-center">
                      <button
                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                        className="flex items-center space-x-2 text-sm font-bold transition-colors cursor-pointer text-black dark:text-white hover:text-brand-accent dark:hover:text-brand-accent"
                      >
                        <FaGlobe className="text-base text-brand-accent" />
                        <span>{languages.find(l => l.code === currentLang)?.name || 'English'}</span>
                        <FaChevronDown className={`text-xs transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {showLangDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-3 w-40 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden text-center p-1"
                          >
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setCurrentLang(lang.code);
                                  setShowLangDropdown(false);
                                }}
                                className={`w-full px-3 py-2 text-xs transition-colors text-center font-bold rounded-xl cursor-pointer ${
                                  currentLang === lang.code 
                                    ? 'text-neutral-950 bg-brand-accent' 
                                    : 'text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5'
                                }`}
                              >
                                {lang.name}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <button
                    onClick={() => { closeMenu(); setIsOpen(false); navigate('/appointment'); }}
                    className="w-full py-3.5 rounded-xl bg-brand-accent hover:bg-[#E6A100] text-neutral-950 font-black text-sm uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-md active:scale-95"
                  >
                    Get Started
                  </button>
                </div>
              )}
            />
          </div>

        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
