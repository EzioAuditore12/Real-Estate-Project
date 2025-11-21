import type { ComponentProps } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { CitiesSelectBox } from './cities-select-box';
import { StatesSelectBox } from './states-combo-box';
import { ItemFilters } from '../filters';

interface SearchLocationBarProps extends ComponentProps<'div'> {
  city: string;
  state: string;
  onCityChange: (city: string) => void;
  onStateChange: (state: string) => void;
}

export const SearchLocationBar = ({
  className,
  city,
  state,
  onCityChange,
  onStateChange,
  ...props
}: SearchLocationBarProps) => {
  return (
    <div
      className={cn('flex w-full flex-row gap-x-3 p-2', className)}
      {...props}
    >
      <ItemFilters />
      <Input placeholder="Search ...." />
      <StatesSelectBox value={state} onValueChange={onStateChange} />
      <CitiesSelectBox
        state={state}
        value={city}
        className="mb-4"
        onValueChange={onCityChange}
      />
    </div>
  );
};
