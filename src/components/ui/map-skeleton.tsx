import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function MapSkeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={cn('flex-[0.5] p-2', className)}>
      <div className="bg-muted/30 h-full w-full overflow-hidden rounded-md">
        <div className="from-muted/40 via-muted/20 to-muted/40 h-full w-full animate-pulse bg-gradient-to-r" />
      </div>
    </div>
  );
}

export default MapSkeleton;
