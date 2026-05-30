import { useState, type ComponentProps } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { CitiesSelectBox } from './cities-select-box';
import { StatesSelectBox } from './states-combo-box';
import { ItemFilters } from '../filters';
import { useGetAiLocationData } from '@/features/app/non-dashboard/-mutations/use-get-ai-location-data';

interface SearchLocationBarProps extends Omit<ComponentProps<'form'>, 'onSubmit'> {
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
  const [prompt, setPrompt] = useState('');
  const { mutate, isPending } = useGetAiLocationData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      mutate({ prompt });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex w-full flex-row gap-x-3 p-2 items-center', className)}
      {...props}
    >
      <ItemFilters />
      <div className="flex flex-1 flex-row">
        <Input
          placeholder="Search by neighborhood, address or prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="rounded-r-none h-10"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-l-none bg-red-500 hover:bg-red-600 text-white h-10 px-4"
        >
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </div>
      <StatesSelectBox value={state} onValueChange={onStateChange} />
      <CitiesSelectBox
        state={state}
        value={city}
        className="mb-4"
        onValueChange={onCityChange}
      />
    </form>
  );
};

