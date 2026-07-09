'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import knowledgeData from '@/data/knowledge.json';
import { useLanguage } from '@/contexts/LanguageContext';

interface TreeNode {
  nameKey: string;
  slug?: string;
  children?: TreeNode[];
}

const knowledgeTree: TreeNode[] = [
  {
    nameKey: 'category.ai',
    children: [
      { nameKey: 'subcategory.llm', children: knowledgeData.filter(k => k.subcategory === 'llm').map(k => ({ nameKey: k.title, slug: k.slug })) },
      { nameKey: 'subcategory.prompt', children: knowledgeData.filter(k => k.subcategory === 'prompt').map(k => ({ nameKey: k.title, slug: k.slug })) },
      { nameKey: 'subcategory.rag', children: knowledgeData.filter(k => k.subcategory === 'rag').map(k => ({ nameKey: k.title, slug: k.slug })) },
      { nameKey: 'subcategory.agent', children: knowledgeData.filter(k => k.subcategory === 'agent').map(k => ({ nameKey: k.title, slug: k.slug })) },
      { nameKey: 'subcategory.mcp', children: knowledgeData.filter(k => k.subcategory === 'mcp').map(k => ({ nameKey: k.title, slug: k.slug })) },
    ],
  },
  {
    nameKey: 'category.python',
    children: knowledgeData.filter(k => k.category === 'python').map(k => ({ nameKey: k.title, slug: k.slug })),
  },
  {
    nameKey: 'category.java',
    children: [],
  },
];

export default function KnowledgeTree() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="w-60 flex-shrink-0">
      <div className="sticky top-24">
        <TreeNodeComponent items={knowledgeTree} pathname={pathname} level={0} t={t} />
      </div>
    </nav>
  );
}

function TreeNodeComponent({ items, pathname, level, t }: { items: TreeNode[]; pathname: string; level: number; t: (key: string) => string }) {
  return (
    <ul className={cn(level > 0 && 'ml-4')}>
      {items.map((item) => (
        <TreeItem key={item.nameKey} item={item} pathname={pathname} level={level} t={t} />
      ))}
    </ul>
  );
}

function TreeItem({ item, pathname, level, t }: { item: TreeNode; pathname: string; level: number; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.slug && pathname === `/knowledge/${item.slug}`;

  if (item.slug) {
    return (
      <li>
        <Link
          href={`/knowledge/${item.slug}`}
          className={cn(
            'block py-2 px-4 text-sm transition-colors duration-200',
            isActive
              ? 'text-[var(--accent)] font-medium'
              : 'text-[var(--n-600)] hover:text-[var(--n-900)] hover:bg-[var(--n-50)]'
          )}
        >
          {item.nameKey}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 py-2 px-4 text-sm font-medium text-[var(--n-700)] hover:text-[var(--n-900)] transition-colors duration-200 w-full text-left"
      >
        {hasChildren && (
          isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        )}
        {t(item.nameKey)}
      </button>
      {isOpen && hasChildren && (
        <TreeNodeComponent items={item.children!} pathname={pathname} level={level + 1} t={t} />
      )}
    </li>
  );
}
