import type { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { getCitiesInStateQueryOptions } from '../../queries/get-cities-in-state.query';

interface CitiesComboBoxProps extends ComponentProps<typeof SelectTrigger> {
  country?: string;
  state: string;
  onValueChange: ComponentProps<typeof Select>['onValueChange'];
}

export function CitiesSelectBox({
  className,
  country = 'India',
  state,
  onValueChange,
  ...props
}: CitiesComboBoxProps) {
  const { data, isLoading } = useQuery(
    getCitiesInStateQueryOptions({ country, state }),
  );

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn(className)} {...props}>
        <SelectValue placeholder="Select a City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cities</SelectLabel>
          {!isLoading &&
            data?.data?.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
