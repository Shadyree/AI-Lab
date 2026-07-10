'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--n-200)] bg-[var(--bg-primary)]">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--n-500)]">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/yourname"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--n-500)] hover:text-[var(--n-700)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@ailab.dev"
              className="text-sm text-[var(--n-500)] hover:text-[var(--n-700)] transition-colors"
            >
              {t('nav.about')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
