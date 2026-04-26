import React from 'react';

export const IconTasks = ({ className = '', size = 18 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7h18" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12h18" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
    <path d="M3 17h18" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35"/>
  </svg>
);

export const IconLocation = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="12" cy="11" r="2.2" fill="#64748b" />
  </svg>
);

export const IconUsers = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="7" r="4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const IconCalendar = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="#64748b" strokeWidth="1.2" fill="none"/>
    <path d="M16 3v4M8 3v4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M3 11h18" stroke="#64748b" strokeWidth="1" opacity="0.6"/>
  </svg>
);

export default IconTasks;
