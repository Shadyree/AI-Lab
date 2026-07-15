import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type TagColor = 'default' | 'purple' | 'blue' | 'green' | 'amber' | 'pink' | 'teal' | 'orange';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
}

const colorMap: Record<TagColor, string> = {
  default: 'bg-[var(--n-100)] text-[var(--n-600)]',
  purple: 'bg-[var(--tag-purple-bg)] text-[var(--tag-purple-text)]',
  blue: 'bg-[var(--tag-blue-bg)] text-[var(--tag-blue-text)]',
  green: 'bg-[var(--tag-green-bg)] text-[var(--tag-green-text)]',
  amber: 'bg-[var(--tag-amber-bg)] text-[var(--tag-amber-text)]',
  pink: 'bg-[var(--tag-pink-bg)] text-[var(--tag-pink-text)]',
  teal: 'bg-[var(--tag-teal-bg)] text-[var(--tag-teal-text)]',
  orange: 'bg-[var(--tag-orange-bg)] text-[var(--tag-orange-text)]',
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
