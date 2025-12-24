import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentProps, type ReactNode } from 'react';

const gridStyles = cva('grid', {
  variants: {
    columns: {
      none: '',
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      auto: 'grid-cols-auto',
      full: 'grid-cols-[repeat(auto-fill,minmax(0,1fr))]',
    },
    rows: {
      none: '',
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    rowGap: {
      none: 'gap-y-0',
      xs: 'gap-y-1',
      sm: 'gap-y-2',
      md: 'gap-y-4',
      lg: 'gap-y-6',
      xl: 'gap-y-8',
    },
    colGap: {
      none: 'gap-x-0',
      xs: 'gap-x-1',
      sm: 'gap-x-2',
      md: 'gap-x-4',
      lg: 'gap-x-6',
      xl: 'gap-x-8',
    },
    alignItems: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justifyItems: {
      start: 'justify-items-start',
      center: 'justify-items-center',
      end: 'justify-items-end',
      stretch: 'justify-items-stretch',
    },
    justifyContent: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    alignContent: {
      start: 'content-start',
      center: 'content-center',
      end: 'content-end',
      between: 'content-between',
      around: 'content-around',
      evenly: 'content-evenly',
    },
  },
});

type GridVariants = VariantProps<typeof gridStyles>;
export type GridProps = ComponentProps<'div'> &
  GridVariants & { children?: ReactNode };

export function Grid({
  className,
  columns,
  rows,
  gap,
  rowGap,
  colGap,
  alignItems,
  justifyItems,
  justifyContent,
  alignContent,
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        gridStyles({
          columns,
          rows,
          gap,
          rowGap,
          colGap,
          alignItems,
          justifyItems,
          justifyContent,
          alignContent,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
