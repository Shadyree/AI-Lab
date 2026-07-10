'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Tag, { type TagColor } from '@/components/ui/Tag';
import journeyData from '@/data/journey.json';
import { useLanguage } from '@/contexts/LanguageContext';

const techColors: Record<string, TagColor> = {
  Java: 'orange',
  'Spring Boot': 'green',
  Vue: 'teal',
  React: 'blue',
  Redis: 'pink',
  MySQL: 'blue',
  Docker: 'blue',
  Python: 'blue',
  Nacos: 'purple',
  Ruoyi: 'amber',
  'uni-app': 'teal',
  'Element UI': 'blue',
  MyBatis: 'orange',
  Dify: 'purple',
  RAG: 'green',
  Ollama: 'pink',
  Qwen: 'pink',
};

export default function JourneyPreview() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section className="py-24 bg-[var(--n-50)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-[var(--n-900)] mb-3">
            {t('journey.preview.title')}
          </h2>
          <p className="text-[var(--n-500)]">
            {t('journey.preview.subtitle')}
          </p>
        </motion.div>

        <div className="relative pl-8">
          {/* Vertical line through all nodes */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--n-200)]" />

          {journeyData.map((phase, i) => (
            <div
              key={phase.year}
              className="relative py-4 group"
            >
              {/* Dot on the line */}
              <div className="absolute -left-8 top-[22px] z-10">
                <div className="w-[11px] h-[11px] rounded-full bg-[var(--bg-primary)] border-2 border-[var(--n-300)] journey-dot" />
              </div>

              {/* Year + Title inline */}
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold text-[var(--n-400)] tabular-nums">
                  {phase.year}
                </span>
                <h3 className="text-base font-medium text-[var(--n-700)] cursor-pointer journey-title">
                  {isZh ? phase.titleZh : phase.titleEn}
                </h3>
              </div>

              {/* Hover detail card */}
              <div className="journey-card-wrapper">
                <div className="journey-card bg-[var(--bg-primary)] border border-[var(--n-200)] rounded-2xl p-8 shadow-xl shadow-black/[0.06]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[var(--n-900)]">
                      {phase.year}
                    </span>
                    <span className="text-sm font-semibold text-[var(--accent)]">
                      {isZh ? phase.roleZh : phase.roleEn}
                    </span>
                    <span className="text-xs text-[var(--n-400)] ml-auto">{phase.period}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--n-800)] mb-3">
                    {isZh ? phase.titleZh : phase.titleEn}
                  </h4>
                  <p className="text-sm text-[var(--n-600)] leading-relaxed mb-5">
                    {isZh ? phase.descZh : phase.descEn}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {(isZh ? phase.highlightsZh : phase.highlightsEn).map((h, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--n-600)] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {phase.techStack.map((tech) => (
                      <Tag key={tech} color={techColors[tech] || 'default'}>
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Today node */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: journeyData.length * 0.05 }}
            className="relative py-4"
          >
            <div className="absolute -left-8 top-[22px] z-10">
              <div className="w-[11px] h-[11px] rounded-full bg-[#7CADF8] border-2 border-[#7CADF8] shadow-[0_0_0_4px_rgba(124,173,248,0.2)]" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-semibold text-[#7CADF8] tabular-nums">
                {t('journey.preview.today')}
              </span>
              <h3 className="text-base font-medium text-[var(--n-700)]">
                {t('journey.future')}
              </h3>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/journey"
            className="text-sm font-medium text-[var(--n-500)] hover:text-[var(--n-900)] transition-colors duration-200"
          >
            {t('journey.preview.viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
