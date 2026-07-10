'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--n-600)] hover:text-[var(--n-900)] hover:bg-[var(--n-50)] rounded-[var(--radius-sm)] transition-colors duration-200"
      aria-label={language === 'en' ? '切换到中文' : 'Switch to English'}
    >
      <Globe size={16} />
      <span>{language === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
}
