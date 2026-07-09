import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type TagColor = 'default' | 'purple' | 'blue' | 'green' | 'amber' | 'pink' | 'teal' | 'orange';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
}

const colorMap: Record<TagColor, string> = {
  default: 'bg-[var(--n-100)] text-[var(--n-600)]',
  purple: 'bg-[#f0ecf9] text-[#7c6cb0]',
  blue: 'bg-[#eaf0f9] text-[#6b83a8]',
  green: 'bg-[#e8f4ee] text-[#5e8a6f]',
  amber: 'bg-[#f8f1e4] text-[#9a8462]',
  pink: 'bg-[#f8eef2] text-[#a87489]',
  teal: 'bg-[#e6f3f0] text-[#5e8a7f]',
  orange: 'bg-[#f8efe6] text-[#a88462]',
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, color = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
          colorMap[color],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
export type { TagColor };
