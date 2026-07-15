import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { Logo } from '../ui/Logo';
import { FaSun, FaMoon, FaBars, FaTimes, FaShieldAlt, FaGlobe, FaChevronDown } from 'react-icons/fa';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, login } = useAuth();
  const { locale: currentLang, setLocale: setCurrentLang, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'ta', name: 'தமிழ்', label: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు', label: 'తెలుగు' },
    { code: 'ml', name: 'മലയാളം', label: 'മലയാളം' },
    { code: 'hi', name: 'हिन्दी', label: 'हिन्दी' }
  ];

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('plans'), path: '/plans' },
    { name: t('calc'), path: '/calculator' },
    { name: t('contact'), path: '/support' }
  ];

  const handleDashboardRedirect = () => {
    navigate('/auth');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <nav className="transition-all duration-300 border border-slate-200/40 dark:border-white/5 backdrop-blur-md bg-white/70 dark:bg-navy-950/65 rounded-2xl shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo showTagline={false} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-12 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-navy-600 dark:hover:text-gold-300 glow-nav-item ${
                  isActive(link.path)
                    ? 'text-navy-700 dark:text-gold-400 font-semibold active'
                    : 'text-slate-500 dark:text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 rounded-xl text-xs font-bold text-navy-950 dark:text-white hover:bg-slate-100 dark:hover:bg-navy-950/20 cursor-pointer"
              >
                <FaGlobe className="text-slate-400" />
                <span>{languages.find(l => l.code === currentLang)?.label}</span>
                <FaChevronDown className="text-[10px] text-slate-400" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-navy-900 border border-slate-200/50 dark:border-white/5 rounded-2xl shadow-xl z-50 overflow-hidden text-left text-xs">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full px-4 py-2 hover:bg-slate-100 dark:hover:bg-navy-950/40 text-left font-semibold ${
                        currentLang === lang.code ? 'text-gold-500 bg-gold-500/5' : 'text-navy-950 dark:text-slate-300'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
                  {t('dashboard')}
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <Button variant="gold" size="sm" onClick={handleDashboardRedirect}>
                {t('login')}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-900 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <FaBars className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title={t('select_lang')} position="right" size="sm">
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium py-2 border-b border-slate-100 dark:border-white/5 ${
                isActive(link.path)
                  ? 'text-navy-600 dark:text-gold-400 font-bold'
                  : 'text-slate-500 dark:text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Language Selector */}
          <div className="border-t border-slate-100 dark:border-white/5 pt-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{t('select_lang')}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                  }}
                  className={`py-2 px-1 rounded-xl border text-center font-bold transition-all ${
                    currentLang === lang.code
                      ? 'bg-gold-500/10 border-gold-500 text-gold-500'
                      : 'border-slate-200 dark:border-white/10 text-slate-500'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/dashboard');
                  }}
                >
                  {t('dashboard')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  {t('logout')}
                </Button>
              </>
            ) : (
              <Button
                variant="gold"
                className="w-full"
                onClick={() => {
                  setIsOpen(false);
                  handleDashboardRedirect();
                }}
              >
                {t('login')}
              </Button>
            )}
          </div>
        </div>
      </Drawer>
      </nav>
    </div>
  );
};
export default Navbar;
