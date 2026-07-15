'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';
import Tag, { type TagColor } from '@/components/ui/Tag';
import knowledgeData from '@/data/knowledge.json';
import { ArrowLeft, Clock, Calendar, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function KnowledgeDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t } = useLanguage();
  const article = knowledgeData.find((k) => k.slug === slug);

  if (!article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--n-900)] mb-4">{t('article.notFound')}</h1>
          <Link href="/knowledge" className="text-[var(--accent)] hover:underline">
            ← {t('knowledge.backToKnowledge')}
          </Link>
        </div>
      </div>
    );
  }

  const difficultyLabels = [t('difficulty.beginner'), t('difficulty.intermediate'), t('difficulty.advanced')];
  const sections = (article as any).sections || [];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-sm text-[var(--n-500)] hover:text-[var(--n-700)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t('knowledge.backToKnowledge')}
          </Link>

          <div className="flex gap-16">
            <article className="flex-1 max-w-[720px]">
              <div className="flex items-center gap-3 mb-6">
                <Tag color={categoryColors[article.category] || 'default'}>{t(`category.${article.category}`)}</Tag>
                <Tag color={subcategoryColors[article.subcategory] || 'default'}>{t(`subcategory.${article.subcategory}`)}</Tag>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[var(--n-900)] mb-8 leading-tight">
                {article.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-[var(--n-600)] leading-relaxed mb-16">
                  {article.summary}
                </p>

                {sections.map((section: any, i: number) => (
                  <section key={i} className="mb-16" id={`section-${i}`}>
                    <h2 className="text-2xl font-bold text-[var(--n-900)] mb-6 pb-3 border-b border-[var(--n-200)]">
                      {section.title}
                    </h2>
                    <div className="space-y-5 bg-[var(--n-50)]/50 rounded-xl p-6">
                      {section.blocks.map((block: any, j: number) => {
                        if (block.type === 'paragraph') {
                          return (
                            <p
                              key={j}
                              className="text-[var(--n-600)] leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: block.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--n-800)]">$1</strong>')
                              }}
                            />
                          );
                        }
                        if (block.type === 'highlight') {
                          return (
                            <div
                              key={j}
                              className="bg-[var(--accent)]/[0.04] border-l-2 border-[var(--accent)] pl-5 py-3 rounded-r-lg"
                            >
                              <p
                                className="text-[var(--n-700)] leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html: block.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--n-900)]">$1</strong>')
                                }}
                              />
                            </div>
                          );
                        }
                        if (block.type === 'list') {
                          return (
                            <ul key={j} className="space-y-2 text-[var(--n-600)]">
                              {block.items.map((item: string, k: number) => (
                                <li key={k} className="flex items-start gap-2">
                                  <span className="text-[var(--accent)] mt-1.5">→</span>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--n-800)]">$1</strong>')
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </section>
                ))}

                <div className="bg-[var(--n-50)] border border-[var(--n-200)] rounded-xl p-6 my-8">
                  <p className="text-sm text-[var(--n-600)]">
                    <strong className="text-[var(--n-900)]">{t('knowledge.note')}:</strong> {t('knowledge.noteText')}
                  </p>
                </div>
              </div>
            </article>

            <aside className="w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                <div className="bg-[var(--n-50)] rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
                    {t('knowledge.contents')}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[var(--n-600)]">
                    {sections.map((section: any, i: number) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="block py-1 hover:text-[var(--accent)] transition-colors leading-snug"
                        >
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--n-500)]">
                    <BarChart size={14} />
                    <span>{difficultyLabels[article.difficulty - 1]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--n-500)]">
                    <Clock size={14} />
                    <span>{article.readTime} {t('knowledge.minRead')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--n-500)]">
                    <Calendar size={14} />
                    <span>{article.updatedAt}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
                    {t('knowledge.related')}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {knowledgeData
                      .filter((k) => k.category === article.category && k.slug !== article.slug)
                      .slice(0, 3)
                      .map((k) => (
                        <li key={k.slug}>
                          <Link
                            href={`/knowledge/${k.slug}`}
                            className="text-[var(--n-600)] hover:text-[var(--accent)] transition-colors"
                          >
                            {k.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
