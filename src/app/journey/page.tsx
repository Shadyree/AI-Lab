'use client';

import { motion } from 'framer-motion';
import Timeline from '@/components/journey/Timeline';
import { useLanguage } from '@/contexts/LanguageContext';

export default function JourneyPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-bold text-[var(--n-900)] mb-4">
            {t('journey.title')}
          </h1>
          <p className="text-lg text-[var(--n-500)]">
            {t('journey.subtitle')}
          </p>
        </motion.div>

        <Timeline />
      </div>
    </div>
  );
}
