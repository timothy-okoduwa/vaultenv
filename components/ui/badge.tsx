import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500',
  {
    variants: {
      variant: {
        default: 'border-green-500/50 bg-green-500/10 text-green-400',
        secondary: 'border-zinc-700 bg-zinc-800 text-zinc-300',
        destructive: 'border-red-500/50 bg-red-500/10 text-red-400',
        outline: 'text-zinc-300 border-zinc-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
