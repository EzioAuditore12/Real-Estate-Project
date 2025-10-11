import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "@/lib/form-context";
import { FieldError } from "./field-error";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  label?: string;
  className?: string;
}

export function CheckboxField({ label, className }: CheckboxProps) {
  const field = useFieldContext<boolean>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <ShadcnCheckbox
        checked={field.state.value ?? false}
        onCheckedChange={checked => field.handleChange(checked === true)}
        id={field.name}
      />
      {label && <Label htmlFor={field.name}>{label}</Label>}
      {hasError && (
        <span className="text-sm text-red-500">
          <FieldError meta={field.state.meta} />
        </span>
      )}
    </div>
  );
}