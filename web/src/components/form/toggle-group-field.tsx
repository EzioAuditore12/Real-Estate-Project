import type { ComponentProps } from 'react';

import { useFieldContext } from "@/lib/form-context";
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { FieldError } from './field-error';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


type MultiToggleGroupProps = ComponentProps<"div"> & {
    options: string[];
    labelName?: string
};

export function ToggleGroupField({className,options,labelName, ...props}:MultiToggleGroupProps) {

    const field = useFieldContext<string[]>();
    const hasError = field.state.meta.errors.length > 0;

    return(
          <div className={cn("w-full ", className)} {...props}>
      {labelName && <Label htmlFor={labelName} className='mb-2'>{labelName}</Label>}
      <ToggleGroup
        type="multiple"
        value={field.state.value ?? []}
        onValueChange={field.handleChange}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option} value={option} className="w-full">
            {option.replace(/_/g, " ")}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="text-sm text-red-500 min-h-5">
        {hasError && <FieldError meta={field.state.meta} />}
      </div>
    </div>
    )

}
