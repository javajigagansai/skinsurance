import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Drawer } from '../ui/Drawer';
import { Logo } from '../ui/Logo';
import { FaSun, FaMoon, FaBars, FaTimes, FaShieldAlt } from 'react-icons/fa';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Plans', path: '/plans' },
    { name: 'Premium Calculator', path: '/calculator' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/support' }
  ];

  const handleDashboardRedirect = () => {
    navigate('/auth');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full transition-all duration-300 border-b border-slate-200/40 dark:border-white/5 backdrop-blur-md bg-white/70 dark:bg-navy-950/65">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <Button variant="gold" size="sm" onClick={handleDashboardRedirect}>
                Login
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
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Navigation Menu" position="right" size="sm">
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
          <div className="pt-4 flex flex-col space-y-2">
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
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                >
                  Log Out
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
                Login
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};
export default Navbar;
