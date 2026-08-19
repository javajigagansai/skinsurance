import React from 'react';

export const Logo = ({ variant = 'horizontal', showTagline = false, className = '', isDark = false }) => {
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src="/logo.png"
          className="h-16 sm:h-20 w-auto object-contain"
          alt="SK Smart Investments"
        />
        {showTagline && (
          <p className="text-[10px] text-slate-400 font-bold tracking-wider mt-1 uppercase">
            Insurance & Investments Specialist
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-start justify-center ${className}`}>
      <img
        src="/logo.png" 
        className="h-10 sm:h-11 md:h-12 w-auto max-w-[160px] sm:max-w-[200px] object-contain transition-all duration-300" 
        alt="SK Smart Investments" 
      />
      {showTagline && (
        <p className="text-[9px] text-slate-400 font-semibold mt-1">
          Insurance & Investments Specialist
        </p>
      )}
    </div>
  );
};

export default Logo;
