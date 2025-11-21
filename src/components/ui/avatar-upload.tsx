import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User2, Edit } from 'lucide-react';

interface AvatarUploadProps {
  value?: File;
  onChange?: (file?: File) => void;
  className?: string;
  dropzoneOptions?: Omit<DropzoneOptions, 'maxFiles' | 'onDrop' | 'accept'>;
}

const AvatarUpload = React.forwardRef<HTMLDivElement, AvatarUploadProps>(
  ({ value, onChange, className, dropzoneOptions }, ref) => {
    const [preview, setPreview] = React.useState<string | undefined>();

    // Create a preview URL when the file value changes
    React.useEffect(() => {
      if (value) {
        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);
        // Clean up the object URL on unmount or when the file changes
        return () => URL.revokeObjectURL(objectUrl);
      }
      // If no file, clear the preview
      setPreview(undefined);
    }, [value]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        // We only care about the first file due to maxFiles: 1
        onChange?.(acceptedFiles[0]);
      },
      [onChange],
    );

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
      },
      maxSize: 5 * 1024 * 1024, // 5MB
      maxFiles: 1,
      ...dropzoneOptions,
    });

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={cn(
          'group relative h-24 w-24 cursor-pointer rounded-full',
          className,
        )}
      >
        <input {...getInputProps()} />
        <Avatar className="h-full w-full">
          <AvatarImage src={preview} alt="Avatar preview" />
          <AvatarFallback>
            <User2 className="text-muted-foreground h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="bg-opacity-0 group-hover:bg-opacity-40 absolute inset-0 flex items-center justify-center rounded-full bg-black transition-all">
          <Edit className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    );
  },
);

AvatarUpload.displayName = 'AvatarUpload';

export { AvatarUpload };
