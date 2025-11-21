import type { ComponentProps } from 'react';

import { useFieldContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { FieldError } from './field-error';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type ToggleFieldProps = ComponentProps<'div'> & {
  options: string[];
  labelName?: string;
};

export function ToggleField({
  className,
  options,
  labelName,
  ...props
}: ToggleFieldProps) {
  const field = useFieldContext<string>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn('w-full', className)} {...props}>
      {labelName && (
        <Label htmlFor={labelName} className="mb-2">
          {labelName}
        </Label>
      )}
      <ToggleGroup
        type="single"
        value={field.state.value ?? ''}
        onValueChange={field.handleChange}
        className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option} value={option} className="w-full">
            {option.replace(/_/g, ' ')}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="min-h-5 text-sm text-red-500">
        {hasError && <FieldError meta={field.state.meta} />}
      </div>
    </div>
  );
}
