'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', key: 'nav.home' },
  { href: '/knowledge', key: 'nav.knowledge' },
  { href: '/journey', key: 'nav.journey' },
  { href: '/projects', key: 'nav.projects' },
  { href: '/about', key: 'nav.about' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="header-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-semibold text-[var(--n-900)] justify-self-start"
        >
          XianRui.AI
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link text-sm font-medium relative px-4 py-2 rounded-lg transition-all duration-300',
                  active
                    ? 'text-[var(--n-900)] bg-[var(--n-900)]/[0.06]'
                    : 'text-[var(--n-500)] hover:text-[var(--n-900)] hover:bg-[var(--n-900)]/[0.04]'
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right controls + mobile hamburger */}
        <div className="justify-self-end flex items-center gap-1">
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[var(--n-700)] hover:bg-[var(--n-900)]/[0.04] transition-colors"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="flex items-center justify-center"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu (accordion animation) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden relative z-50 overflow-hidden bg-[var(--bg-primary)]"
          >
            <nav className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col border-t border-[var(--n-200)]">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'text-sm font-medium px-4 py-3 rounded-lg transition-all duration-300',
                      active
                        ? 'text-[var(--n-900)] bg-[var(--n-900)]/[0.06]'
                        : 'text-[var(--n-500)] hover:text-[var(--n-900)] hover:bg-[var(--n-900)]/[0.04]'
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay (fade) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black/30 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
