'use client';

import { motion } from 'framer-motion';
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

export default function Timeline() {
  const { t, language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className="relative pl-10">
      {/* Vertical line through all nodes */}
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--n-200)]" />

      {journeyData.map((phase, i) => (
        <motion.div
          key={phase.year}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative py-12"
        >
          {/* Dot on the line */}
          <div className="absolute -left-10 top-[18px] z-10">
            <div className="w-[15px] h-[15px] rounded-full bg-white border-2 border-[var(--n-300)]" />
          </div>

          {/* Year + Title */}
          <div className="flex items-baseline gap-4 mb-1">
            <span className="text-lg font-bold text-[var(--n-400)] tabular-nums flex-shrink-0">
              {phase.year}
            </span>
            <h3 className="text-2xl font-bold text-[var(--n-900)]">
              {isZh ? phase.titleZh : phase.titleEn}
            </h3>
          </div>

          {/* Role + Period */}
          <div className="flex items-center gap-3 ml-[52px] mb-4">
            <span className="text-sm font-medium text-[var(--accent)]">
              {isZh ? phase.roleZh : phase.roleEn}
            </span>
            <span className="text-xs text-[var(--n-400)]">{phase.period}</span>
          </div>

          {/* Description */}
          <p className="text-[var(--n-600)] leading-relaxed ml-[52px] mb-5">
            {isZh ? phase.descZh : phase.descEn}
          </p>

          {/* Highlights */}
          <div className="ml-[52px] mb-4">
            <h4 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('journey.highlights')}
            </h4>
            <ul className="space-y-2">
              {(isZh ? phase.highlightsZh : phase.highlightsEn).map((h, j) => (
                <li key={j} className="flex items-start gap-2 text-[var(--n-600)] text-sm leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-[var(--n-300)] mt-2 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="ml-[52px] flex flex-wrap gap-2">
            {phase.techStack.map((tech) => (
              <Tag key={tech} color={techColors[tech] || 'default'}>
                {tech}
              </Tag>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Today node */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative py-12"
      >
        <div className="absolute -left-10 top-[18px] z-10">
          <div className="w-[15px] h-[15px] rounded-full bg-[#7CADF8] border-2 border-[#7CADF8] shadow-[0_0_0_4px_rgba(124,173,248,0.2)]" />
        </div>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-lg font-bold text-[#7CADF8] tabular-nums flex-shrink-0">
            {t('journey.preview.today')}
          </span>
          <h3 className="text-2xl font-bold text-[var(--n-900)]">
            {t('journey.future')}
          </h3>
        </div>
        <p className="text-[var(--n-500)] leading-relaxed ml-[52px]">
          {t('journey.preview.subtitle')}
        </p>
      </motion.div>
    </div>
  );
}
