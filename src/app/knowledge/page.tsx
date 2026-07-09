'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Tag, { type TagColor } from '@/components/ui/Tag';
import KnowledgeTree from '@/components/knowledge/KnowledgeTree';
import knowledgeData from '@/data/knowledge.json';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search } from 'lucide-react';

const categoryColors: Record<string, TagColor> = {
  ai: 'purple',
  python: 'blue',
  java: 'orange',
};

const subcategoryColors: Record<string, TagColor> = {
  llm: 'pink',
  prompt: 'amber',
  rag: 'green',
  agent: 'teal',
  mcp: 'blue',
  patterns: 'default',
};

export default function KnowledgePage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? knowledgeData.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.subcategory.toLowerCase().includes(q)
        );
      })
    : knowledgeData;

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[var(--n-900)] mb-4">
            {t('knowledge.title')}
          </h1>
          <p className="text-lg text-[var(--n-500)] mb-8">
            {t('knowledge.subtitle')}
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--n-400)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('knowledge.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-[var(--n-200)] rounded-xl focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all placeholder:text-[var(--n-400)]"
            />
          </div>
        </motion.div>

        <div className="flex gap-16">
          <KnowledgeTree />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[var(--n-400)] text-lg">{t('knowledge.noResults')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link href={`/knowledge/${item.slug}`}>
                      <Card className="h-full">
                        <div className="flex items-center gap-2 mb-4">
                          <Tag color={categoryColors[item.category] || 'default'}>{t(`category.${item.category}`)}</Tag>
                          <Tag color={subcategoryColors[item.subcategory] || 'default'}>{t(`subcategory.${item.subcategory}`)}</Tag>
                          <span className="text-xs text-[var(--n-400)] ml-auto">
                            {item.readTime} {t('knowledge.minRead')}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--n-900)] mb-3">
                          {item.title}
                        </h3>
                        <p className="text-[var(--n-500)] text-sm leading-relaxed">
                          {item.summary}
                        </p>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
