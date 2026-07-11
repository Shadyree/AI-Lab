'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Tag, { type TagColor } from '@/components/ui/Tag';
import knowledgeData from '@/data/knowledge.json';
import { useLanguage } from '@/contexts/LanguageContext';

const categoryColors: Record<string, TagColor> = {
  ai: 'purple',
  python: 'blue',
  java: 'orange',
};

export default function FeaturedKnowledge() {
  const { t } = useLanguage();
  const featured = knowledgeData.slice(0, 3);

  return (
    <section className="py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-[var(--n-900)] mb-4">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-[var(--n-500)] mb-12">
            {t('featured.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/knowledge/${item.slug}`}>
                <Card className="h-full" data-knowledge-card>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <Tag color={categoryColors[item.category] || 'default'}>{t(`category.${item.category}`)}</Tag>
                      <span className="text-xs text-[var(--n-400)]">
                        {item.readTime} {t('knowledge.minRead')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--n-900)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[var(--n-500)] text-sm leading-relaxed flex-1">
                      {item.summary}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/knowledge" className="text-sm font-medium text-[var(--n-700)] hover:text-[var(--accent)] transition-colors">
            {t('featured.viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
