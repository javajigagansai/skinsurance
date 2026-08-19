import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/contexts/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from '../components/ui/Logo';
import { FaGlobe, FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggeredMenu } from '../components/ui/StaggeredMenu';

export const Navbar = () => {
  const { user, logout, isAuthenticated, isManager } = useAuth();
  const { locale: currentLang, setLocale: setCurrentLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
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

  // Theme toggle is handled by ThemeContext

  const languages = [
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'ta', name: 'தமிழ்', label: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు', label: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം', label: 'മലയാളം' },
    { code: 'hi', name: 'हिन्दी', label: 'हिन्दी' }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Insurance Plans', path: '/plans' },
    { name: 'Claims', path: '/claims' },
    { name: 'Contact', path: '/support' }
  ];

  const handleDashboardRedirect = () => {
    navigate('/login');
  };

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

  const isActive = (path) => location.pathname === path;
  
  // Logic: Transparent only if we are on the homepage, not scrolled, and mobile menu is closed.
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled && !isOpen;

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 bg-white dark:bg-neutral-950 backdrop-blur-[20px] shadow-premium-soft dark:shadow-premium-dark border-b border-black/5 dark:border-white/10 py-2 sm:py-2.5 md:py-3"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[52px] sm:min-h-[60px]">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90 shrink-0">
            {/* If the background is transparent (light video hero), use dark logo. If solid (dark navbar), use light logo. */}
            <Logo showTagline={false} isDark={!isTransparent} />
          </Link>

          {/* Mobile Center: Company Name (Visible on mobile/tablet, hidden on desktop lg:) */}
          <div className="lg:hidden flex-1 px-1.5 sm:px-3 text-center min-w-0 flex items-center justify-center">
            <span
              className={`block truncate font-bold uppercase transition-colors duration-300 ${
                isTransparent
                  ? 'text-neutral-900'
                  : 'text-neutral-900 dark:text-white'
              }`}
              style={{
                fontSize: 'clamp(11px, 3.2vw, 15px)',
                letterSpacing: '0.06em',
                lineHeight: '1.2'
              }}
            >
              SK SMART INVESTMENTS
            </span>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative px-3 py-2 text-sm xl:text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 rounded-lg group ${
                    active 
                      ? (isTransparent ? 'text-black font-bold' : 'text-neutral-950 dark:text-brand-accent font-bold') 
                      : (isTransparent ? 'text-black/80 hover:text-black' : 'text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-brand-accent')
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

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {/* Language Selector */}
            <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className={`flex items-center space-x-1.5 text-sm font-semibold transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 ${isTransparent ? 'text-black' : 'text-neutral-800 dark:text-neutral-200 hover:text-brand-accent'}`}
                >
                <FaGlobe className="text-sm" />
                <span>{languages.find(l => l.code === currentLang)?.label || 'EN'}</span>
                <FaChevronDown className="text-[9px]" />
              </button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-32 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl z-50 overflow-hidden text-left p-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-3.5 py-2.5 text-xs rounded-xl transition-colors text-left font-bold cursor-pointer ${
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

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {isManager && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-hover text-neutral-950 font-bold text-sm shadow-sm cursor-pointer transition-all hover:scale-105 active:scale-95"
                >
                  Dashboard
                </button>
              )}
 
              {!isManager && (
                <button
                  onClick={() => navigate('/appointment')}
                  className="px-6 py-2.5 rounded-xl bg-brand-accent hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 text-neutral-950 font-black text-xs uppercase tracking-wider cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>

          {/* Mobile GSAP StaggeredMenu (Handles its own toggle) */}
          <div className="lg:hidden flex items-center shrink-0">
            <StaggeredMenu
              position="right"
              items={navLinks.map(link => ({
                label: link.name,
                ariaLabel: `Go to ${link.name}`,
                link: link.path
              }))}
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
                <div className="flex flex-col space-y-6">
                  {/* Mobile Language */}
                  <div className="flex items-center justify-center space-x-8 mb-6">

                    <div className="relative flex justify-center">
                    <button
                      onClick={() => setShowLangDropdown(!showLangDropdown)}
                      className="flex items-center space-x-2 text-[16px] font-bold transition-colors cursor-pointer text-black dark:text-white hover:text-brand-accent dark:hover:text-brand-accent"
                    >
                      <FaGlobe className="text-[18px]" />
                      <span>{languages.find(l => l.code === currentLang)?.label || 'EN'}</span>
                      <FaChevronDown className={`text-[12px] transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {showLangDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full mt-4 w-40 bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-[12px] shadow-xl z-50 overflow-hidden text-center"
                        >
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setCurrentLang(lang.code);
                                setShowLangDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-[15px] transition-colors text-center font-medium cursor-pointer ${
                                currentLang === lang.code 
                                  ? 'text-brand-accent font-bold bg-brand-accent/10' 
                                  : 'text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-white/5 hover:text-brand-accent dark:hover:text-brand-accent'
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
                  {isAuthenticated ? (
                    <>
                      {isManager && (
                        <button
                          onClick={() => { closeMenu(); setIsOpen(false); navigate('/dashboard'); }}
                          className="w-full py-4 rounded-[14px] bg-brand-accent hover:bg-brand-hover text-black font-bold text-[16px] cursor-pointer"
                        >
                          Dashboard
                        </button>
                      )}
                      {!isManager && (
                        <button
                          onClick={() => { closeMenu(); setIsOpen(false); navigate('/appointment'); }}
                          className="w-full py-4 rounded-xl bg-brand-accent hover:bg-[#E6A100] text-black font-bold text-[16px] cursor-pointer transition-all duration-300 shadow-sm active:scale-95"
                        >
                          Get Started
                        </button>
                      )}
 
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { closeMenu(); setIsOpen(false); navigate('/appointment'); }}
                        className="w-full py-4 rounded-xl bg-brand-accent hover:bg-[#E6A100] text-black font-bold text-[16px] cursor-pointer transition-all duration-300 shadow-sm active:scale-95"
                      >
                        Get Started
                      </button>
                    </>
                  )}
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

