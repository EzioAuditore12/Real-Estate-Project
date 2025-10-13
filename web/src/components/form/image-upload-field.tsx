import { useFieldContext } from '@/lib/form-context';
import { FileUpload as BaseFileUpload } from '@/components/ui/file-upload';
import { Label } from '@/components/ui/label';
import { FieldError } from './field-error';
import { cn } from '@/lib/utils';

interface FormFileUploadProps {
  label?: string;
  className?: string;
}

export function ImageUploadField({ label, className }: FormFileUploadProps) {
  const field = useFieldContext<File[]>();
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className={cn('w-full', className)}>
      {label && <Label>{label}</Label>}
      <BaseFileUpload
        value={field.state.value ?? []}
        onChange={field.handleChange}
      />
      {hasError && (
        <div className="text-sm text-red-500 mt-1">
          <FieldError meta={field.state.meta} />
        </div>
      )}
    </div>
  );
}
