'use client';

import { motion } from 'framer-motion';
import Tag, { type TagColor } from '@/components/ui/Tag';
import { ExternalLink } from 'lucide-react';
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

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    problem: string;
    challenge: string;
    architecture: string;
    techStack: string[];
    result: string;
    metrics?: { label: string; value: string }[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      id={project.slug}
      className="border border-[var(--n-200)] rounded-[var(--radius-md)] p-8 md:p-12"
    >
      <div className="flex items-start justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--n-900)]">
          {project.title}
        </h2>
        <ExternalLink size={20} className="text-[var(--n-400)] flex-shrink-0 mt-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('projects.problem')}
            </h3>
            <p className="text-[var(--n-600)] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('projects.challenge')}
            </h3>
            <p className="text-[var(--n-600)] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('projects.architecture')}
            </h3>
            <p className="text-[var(--n-600)] font-mono text-sm bg-[var(--n-50)] p-4 rounded-[var(--radius-sm)]">
              {project.architecture}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('projects.techStack')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Tag key={tech} color={techColors[tech] || 'default'}>{tech}</Tag>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
              {t('projects.result')}
            </h3>
            <p className="text-[var(--n-700)] font-medium leading-relaxed">
              {project.result}
            </p>
          </div>

          {project.metrics && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--n-400)] uppercase tracking-wider mb-3">
                {t('projects.metrics')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-2xl font-bold text-[var(--n-900)]">
                      {metric.value}
                    </div>
                    <div className="text-xs text-[var(--n-500)]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
