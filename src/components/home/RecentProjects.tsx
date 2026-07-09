'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Tag, { type TagColor } from '@/components/ui/Tag';
import projectsData from '@/data/projects.json';
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
  Git: 'orange',
  Linux: 'amber',
  Dify: 'purple',
  RAG: 'green',
  Ollama: 'pink',
  Qwen: 'pink',
};

export default function RecentProjects() {
  const { t } = useLanguage();
  const recent = projectsData.slice(0, 2);

  return (
    <section className="py-32 bg-[var(--bg-secondary)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-[var(--n-900)] mb-4">
            {t('projects.recent.title')}
          </h2>
          <p className="text-lg text-[var(--n-500)] mb-12">
            {t('projects.recent.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recent.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/projects#${project.slug}`}>
                <Card className="h-full">
                  <h3 className="text-xl font-semibold text-[var(--n-900)] mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[var(--n-500)] text-sm leading-relaxed mb-4">
                    {project.problem}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Tag key={tech} color={techColors[tech] || 'default'}>{tech}</Tag>
                    ))}
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/projects" className="text-sm font-medium text-[var(--n-700)] hover:text-[var(--accent)] transition-colors">
            {t('projects.recent.viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
