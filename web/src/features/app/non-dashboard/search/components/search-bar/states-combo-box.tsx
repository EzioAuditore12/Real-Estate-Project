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
import { getStatesInCountryQueryOptions } from '../../queries/get-states-in-country.query';

interface StateSelectBoxProps extends ComponentProps<typeof SelectTrigger> {
  country?: string;
  onValueChange: ComponentProps<typeof Select>['onValueChange'];
}

export function StatesSelectBox({
  className,
  country = 'India',
  onValueChange,
  ...props
}: StateSelectBoxProps) {
  const { data, isLoading } = useQuery(
    getStatesInCountryQueryOptions({ country }),
  );

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn(className)} {...props}>
        <SelectValue placeholder="Select a State" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>States</SelectLabel>
          {!isLoading &&
            data?.data?.states.map((state) => (
              <SelectItem key={state.state_code} value={state.name}>
                {state.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
