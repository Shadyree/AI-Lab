import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'link';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-[var(--n-900)] text-white hover:bg-[var(--n-800)] px-6 py-3 rounded-xl': variant === 'primary',
            'border border-[var(--n-300)] text-[var(--n-700)] hover:bg-[var(--n-50)] hover:border-[var(--n-400)] px-6 py-3 rounded-xl': variant === 'ghost',
            'text-[var(--n-700)] underline underline-offset-[3px] hover:text-[var(--accent)] px-0 py-0': variant === 'link',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
