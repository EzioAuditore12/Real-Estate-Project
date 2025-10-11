import React, { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { useFieldContext } from '@/lib/form-context';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { FieldError } from '../form/field-error';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AvatarUploadProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  labelName?: string;
  accept?: string;
}

const sizeClasses = {
  sm: 'h-16 w-16',
  md: 'h-24 w-24', 
  lg: 'h-32 w-32'
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
};

export const AvatarUploadField: React.FC<AvatarUploadProps> = ({ 
  className = '',
  size = 'md',
  labelName,
  accept = "image/*"
}) => {
  const field = useFieldContext<File | null>();
  const hasError = field.state.meta.errors.length > 0;
  const [previewURL, setPreviewURL] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    fileUploadRef.current?.click();
  };

  const handleFileChange = () => {
    const uploadedFile = fileUploadRef.current?.files?.[0];
    if (!uploadedFile) return;

    // Create local preview URL
    const newPreviewURL = URL.createObjectURL(uploadedFile);
    setPreviewURL(newPreviewURL);

    // Update form field value
    field.handleChange(uploadedFile);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewURL('');
    field.handleChange(null); // <-- pass undefined instead of ''
    if (fileUploadRef.current) {
      fileUploadRef.current.value = '';
    }
  };

  const displayName = labelName || field.name.charAt(0).toUpperCase() + field.name.slice(1);

  return (
    <div className={cn('w-full flex flex-col items-center', className)}>
      {labelName && (
        <Label htmlFor={field.name} className="mb-4 text-center">
          {displayName}
        </Label>
      )}
      
      <div 
        className={cn(
          'relative cursor-pointer transition-all duration-200',
          sizeClasses[size]
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Remove button */}
        {previewURL && (
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              'absolute top-1 right-1 z-10 bg-white rounded-full p-1 shadow hover:bg-red-100 transition-colors',
              iconSizes[size]
            )}
            aria-label="Remove avatar"
          >
            <X className={cn('text-red-500', iconSizes[size])} />
          </button>
        )}

        {/* Shadcn Avatar */}
        <Avatar className={cn(
          sizeClasses[size],
          'border-2 transition-all duration-200',
          hasError ? 'border-red-500' : 'border-gray-300',
          isHovered && 'brightness-75'
        )}>
          <AvatarImage 
            src={previewURL || undefined} // <-- use undefined instead of null
            alt="Avatar preview"
            className="object-cover"
          />
          <AvatarFallback className="bg-muted flex items-center justify-center">
            <Upload className={iconSizes[size]} />
          </AvatarFallback>
        </Avatar>

        {/* Hover Overlay */}
        <div className={cn(
          'absolute inset-0 rounded-full bg-black bg-opacity-0 flex items-center justify-center transition-all duration-200',
          isHovered && 'bg-opacity-40'
        )}>
          {isHovered && (
            previewURL ? (
              <Camera className={cn('text-white', iconSizes[size])} />
            ) : (
              <Upload className={cn('text-white', iconSizes[size])} />
            )
          )}
        </div>

        {/* Hidden file input */}
        <input 
          type="file"
          ref={fileUploadRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          id={field.name}
        />
      </div>

      {/* Error display */}
      <div className="text-sm text-red-500 min-h-5 text-center mt-2">
        {hasError && <FieldError meta={field.state.meta} />}
      </div>
    </div>
  );
};