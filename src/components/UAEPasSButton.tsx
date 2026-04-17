import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onClick: () => void;
  label?: string;
  className?: string;
}

const UAEPasSButton: React.FC<Props> = ({ onClick, label = "Sign in with UAE PASS", className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full h-[54px] bg-white border border-black rounded-full flex items-center justify-center gap-3 px-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-center w-8 h-8 shrink-0">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Fingerprint Pattern */}
          <path d="M14 16.5C14 13.5 16.5 11 19.5 11C22.5 11 25 13.5 25 16.5V20" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 18.5C11 14 15 10 20 10C25 10 29 14 29 18.5V24" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 19V16.5C17 15.1 18.1 14 19.5 14C20.9 14 22 15.1 22 16.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
          
          {/* The UAE Colors Accent */}
          <path d="M14 22.5V19.5" stroke="#00732F" strokeWidth="2" strokeLinecap="round" /> {/* Green */}
          <path d="M17 25V24" stroke="#EE1F25" strokeWidth="2" strokeLinecap="round" />   {/* Red */}
          <path d="M20 28V26" stroke="black" strokeWidth="2" strokeLinecap="round" />     {/* Black */}
          
          {/* Outer Detail Dots */}
          <circle cx="28" cy="14" r="1" fill="#9CA3AF" />
          <circle cx="30" cy="18" r="1" fill="#9CA3AF" />
          <circle cx="29" cy="22" r="1" fill="#9CA3AF" />
          <circle cx="10" cy="22" r="1" fill="#9CA3AF" />
          <circle cx="12" cy="14" r="1" fill="#9CA3AF" />
        </svg>
      </div>
      <span className="text-black font-bold text-base tracking-tight">{label}</span>
    </motion.button>
  );
};

export default UAEPasSButton;
