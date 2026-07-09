'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

const navItems = [
  { href: '/', key: 'nav.home' },
  { href: '/knowledge', key: 'nav.knowledge' },
  { href: '/journey', key: 'nav.journey' },
  { href: '/projects', key: 'nav.projects' },
  { href: '/about', key: 'nav.about' },
];

export default function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="header-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="text-lg font-semibold text-[var(--n-900)] justify-self-start">
          DevForge
        </Link>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link text-sm font-medium relative px-4 py-2 rounded-lg transition-all duration-300',
                  isActive
                    ? 'text-[var(--n-900)] bg-[var(--n-900)]/[0.06]'
                    : 'text-[var(--n-500)] hover:text-[var(--n-900)] hover:bg-[var(--n-900)]/[0.04]'
                )}
              >
                {t(item.key)}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--accent)] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="justify-self-end">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
