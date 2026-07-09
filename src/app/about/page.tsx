'use client';

import { motion } from 'framer-motion';
import Tag, { type TagColor } from '@/components/ui/Tag';
import { useLanguage } from '@/contexts/LanguageContext';

const techColors: Record<string, TagColor> = {
  Java: 'orange',
  'Spring Boot': 'green',
  'Spring Cloud Alibaba': 'green',
  Nacos: 'purple',
  'MyBatis-Plus': 'orange',
  Redis: 'pink',
  MySQL: 'blue',
  Vue: 'teal',
  React: 'blue',
  'Element UI': 'blue',
  'Ant Design': 'blue',
  'uni-app': 'teal',
  Linux: 'amber',
  Docker: 'blue',
  Git: 'orange',
  Dify: 'purple',
  RAG: 'green',
  Ollama: 'pink',
  Qwen: 'pink',
};

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-[900px] mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl font-bold text-[var(--n-900)] mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-[var(--n-500)]">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-24">
          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-6">
              {t('about.education')}
            </h2>
            <div className="border border-[var(--n-200)] rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--n-900)]">
                    {t('about.school')}
                  </h3>
                  <p className="text-[var(--n-500)] mt-1">{t('about.major')}</p>
                </div>
                <span className="text-sm text-[var(--n-400)] flex-shrink-0">{t('about.degree')}</span>
              </div>
              <div className="mt-3 flex gap-4">
                <Tag color="teal">{t('about.cet6')}</Tag>
              </div>
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-6">
              {t('about.techStack')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {techGroups.map((group) => (
                <div key={group.labelKey} className="border border-[var(--n-200)] rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-[var(--n-700)] mb-3">
                    {t(group.labelKey)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item} color={techColors[item] || 'default'}>
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

const techGroups = [
  { labelKey: 'about.backend', items: ['Java', 'Spring Boot', 'Spring Cloud Alibaba', 'Nacos', 'MyBatis-Plus', 'Redis', 'MySQL'] },
  { labelKey: 'about.frontend', items: ['Vue', 'React', 'Element UI', 'Ant Design', 'uni-app', '微信小程序'] },
  { labelKey: 'about.devops', items: ['Linux', 'Docker', 'Git'] },
  { labelKey: 'about.ai', items: ['Dify', 'RAG', 'Ollama', 'Qwen', '本地知识库'] },
];
