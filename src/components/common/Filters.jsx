import React from 'react';

export const Filters = ({ options, activeFilter, onChange, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
            activeFilter === opt.value
              ? 'bg-navy-950 text-white border-navy-950 dark:bg-gold-400 dark:text-navy-950 dark:border-gold-400 font-bold shadow-sm'
              : 'bg-white dark:bg-navy-900 text-slate-500 border-slate-200 hover:border-slate-400 dark:text-slate-300 dark:border-white/10 dark:hover:border-white/20'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
export default Filters;
