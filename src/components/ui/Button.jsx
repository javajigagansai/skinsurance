import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, gold, danger, text
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  loading = false,
  icon: Icon
}) => {
  const { isDark } = useTheme();

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };

  const variantStyles = {
    primary: 'bg-navy-700 text-white hover:bg-navy-600 dark:bg-navy-500 dark:hover:bg-navy-400 shadow-md shadow-navy-950/10 hover:shadow-lg',
    secondary: 'bg-slate-200 text-navy-950 hover:bg-slate-300 dark:bg-navy-800 dark:text-navy-100 dark:hover:bg-navy-700',
    outline: 'border border-navy-700 text-navy-700 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-950/30',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-400 text-white hover:from-gold-600 hover:to-gold-500 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 border border-gold-300/30 font-semibold',
    danger: 'bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400 shadow-md',
    text: 'text-navy-700 hover:text-navy-900 dark:text-navy-300 dark:hover:text-navy-100 px-2 py-1'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && Icon && <Icon className="mr-2 text-base shrink-0" />}
      {children}
    </button>
  );
};
export default Button;
