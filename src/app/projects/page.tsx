'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import projectsData from '@/data/projects.json';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsPage() {
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
            {t('projects.title')}
          </h1>
          <p className="text-lg text-[var(--n-500)]">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-12">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
