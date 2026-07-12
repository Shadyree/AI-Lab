'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const [cardActive, setCardActive] = useState(false);
  const [cardLeft, setCardLeft] = useState(0);
  const [cardTranslateX, setCardTranslateX] = useState(40);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const hoveredPhase = hoveredIndex !== null ? journeyData[hoveredIndex] : null;

  // Measure max title right edge once for card left position
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionPaddingLeft = parseFloat(getComputedStyle(section).paddingLeft);

    let maxRight = 0;
    for (const titleEl of titleRefs.current) {
      if (!titleEl) continue;
      const rect = titleEl.getBoundingClientRect();
      const right = rect.right - sectionRect.left - sectionPaddingLeft;
      if (right > maxRight) maxRight = right;
    }
    setCardLeft(maxRight + 20);
  }, []);

  // Measure card position on hover, with animation restart
  useEffect(() => {
    if (hoveredIndex === null || !sectionRef.current) return;

    const section = sectionRef.current;
    const sectionRect = section.getBoundingClientRect();
    const rowEl = rowRefs.current[hoveredIndex];

    // Find the third knowledge card
    const knowledgeCards = document.querySelectorAll('[data-knowledge-card]');
    const thirdCard = knowledgeCards[2] as HTMLElement | undefined;

    if (!rowEl || !thirdCard) return;

    const rowRect = rowEl.getBoundingClientRect();
    const cardRect = thirdCard.getBoundingClientRect();

    const sectionPaddingLeft = parseFloat(getComputedStyle(section).paddingLeft);

    setCardStyle({
      left: cardLeft,
      right: sectionRect.right - cardRect.right - sectionPaddingLeft,
      top: rowRect.top - sectionRect.top,
    });

    // Force slide-in: start offset, paint, then animate to position
    setCardActive(false);
    setCardTranslateX(40);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setCardActive(true);
        setCardTranslateX(0);
      });
    });
  }, [hoveredIndex, cardLeft]);

  const handleMouseEnter = useCallback((index: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredIndex(index);
    setCardActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCardActive(false);
    leaveTimerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 450);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[var(--n-50)]">
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
              ref={(el) => { rowRefs.current[i] = el; }}
              className="relative py-4"
            >
              {/* Dot on the line */}
              <div
                className="absolute -left-8 top-[22px] z-10 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`w-[11px] h-[11px] rounded-full bg-[var(--bg-primary)] border-2 transition-colors duration-200 ${
                    hoveredIndex === i
                      ? 'border-[var(--accent)] bg-[var(--accent-bg)]'
                      : 'border-[var(--n-300)]'
                  }`}
                />
              </div>

              {/* Year + Title inline */}
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold text-[var(--n-400)] tabular-nums">
                  {phase.year}
                </span>
                <h3
                  ref={(el) => { titleRefs.current[i] = el; }}
                  className={`text-base font-medium cursor-pointer transition-colors duration-200 ${
                    hoveredIndex === i ? 'text-[var(--accent)]' : 'text-[var(--n-700)]'
                  }`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {isZh ? phase.titleZh : phase.titleEn}
                </h3>
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

      {/* Hover detail card – always in DOM, positioned relative to section */}
      <div
        key={hoveredIndex ?? 'none'}
        className={`journey-card-wrapper ${cardActive ? 'active' : ''}`}
        style={{
          ...cardStyle,
          transform: `translateX(${cardTranslateX}px)`,
          transition: 'opacity 950ms cubic-bezier(0.16, 1, 0.3, 1), transform 950ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={() => {
          if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
          }
        }}
        onMouseLeave={handleMouseLeave}
      >
        {hoveredPhase && (
          <div className="journey-card bg-[var(--bg-primary)] border border-[var(--n-200)] rounded-2xl p-8 shadow-xl shadow-black/[0.06]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[var(--n-900)]">
                {hoveredPhase.year}
              </span>
              <span className="text-sm font-semibold text-[var(--accent)]">
                {isZh ? hoveredPhase.roleZh : hoveredPhase.roleEn}
              </span>
              <span className="text-xs text-[var(--n-400)] ml-auto">{hoveredPhase.period}</span>
            </div>
            <h4 className="text-lg font-semibold text-[var(--n-800)] mb-3">
              {isZh ? hoveredPhase.titleZh : hoveredPhase.titleEn}
            </h4>
            <p className="text-sm text-[var(--n-600)] leading-relaxed mb-5">
              {isZh ? hoveredPhase.descZh : hoveredPhase.descEn}
            </p>
            <ul className="space-y-2 mb-5">
              {(isZh ? hoveredPhase.highlightsZh : hoveredPhase.highlightsEn).map((h, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-[var(--n-600)] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {hoveredPhase.techStack.map((tech) => (
                <Tag key={tech} color={techColors[tech] || 'default'}>
                  {tech}
                </Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
