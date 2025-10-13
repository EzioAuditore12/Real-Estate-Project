import { cn } from '@/lib/utils';
import {
  UploadCloud,
  File as FileIcon,
  CheckCircle2,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';
import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { Progress } from '@/components/ui/progress';

// Helper to format file size
const formatFileSize = (bytes?: number) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

type FileUploadProps = {
  value?: File[];
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  dropzoneOptions?: DropzoneOptions;
  className?: string;
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    { value: fileList = [], onChange, disabled, dropzoneOptions, className },
    ref,
  ) => {
    const [uploadProgress, setUploadProgress] = React.useState<
      Record<string, number>
    >({});
    const [previews, setPreviews] = React.useState<Record<string, string>>({});

    React.useEffect(() => {
      const previewMap: Record<string, string> = {};
      fileList.forEach((file) => {
        if (file.type.startsWith('image/')) {
          previewMap[file.name] = URL.createObjectURL(file);
        }
      });
      setPreviews((prev) => {
        Object.values(prev).forEach((url) => {
          if (!Object.values(previewMap).includes(url)) {
            URL.revokeObjectURL(url);
          }
        });
        return previewMap;
      });

      return () => {
        Object.values(previewMap).forEach(URL.revokeObjectURL);
      };
    }, [fileList]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;
        const newFiles = [...fileList, ...acceptedFiles];
        onChange?.(newFiles);

        const newProgress = { ...uploadProgress };
        acceptedFiles.forEach((file) => {
          newProgress[file.name] = 0;
        });
        setUploadProgress(newProgress);

        acceptedFiles.forEach((file) => {
          const timer = setInterval(() => {
            setUploadProgress((prev) => {
              const current = prev[file.name] ?? 0;
              if (current >= 95) {
                clearInterval(timer);
                return { ...prev, [file.name]: 100 };
              }
              return { ...prev, [file.name]: current + 5 };
            });
          }, 100);
        });
      },
      [fileList, onChange, uploadProgress],
    );

    const onRemove = (fileName: string) => {
      const remaining = fileList.filter((file) => file.name !== fileName);
      onChange?.(remaining);

      setUploadProgress((prev) => {
        const updated = { ...prev };
        delete updated[fileName];
        return updated;
      });

      const previewUrl = previews[fileName];
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviews((prev) => {
          const updated = { ...prev };
          delete updated[fileName];
          return updated;
        });
      }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      disabled,
      ...dropzoneOptions,
    });

    return (
      <div ref={ref} className="w-full space-y-4">
        <div
          {...getRootProps()}
          className={cn(
            'relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 px-6 py-8 text-center transition-colors hover:border-primary hover:bg-muted',
            isDragActive && 'border-primary bg-primary/10',
            disabled && 'cursor-not-allowed opacity-60',
            className,
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Click to upload
            </span>{' '}
            or drag and drop
          </div>
          <p className="mt-1 text-xs text-muted-foreground/80">
            PNG, JPG, WEBP (max 50MB total, 10 files)
          </p>
        </div>

        {fileList.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              Uploaded ({fileList.length})
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {fileList.map((file) => {
                const progress = uploadProgress[file.name] ?? 0;
                const isUploaded = progress === 100;
                const isImage = file.type.startsWith('image/');
                const previewUrl = previews[file.name];

                return (
                  <div
                    key={file.name}
                    className="group relative overflow-hidden rounded-lg border bg-background shadow-sm"
                  >
                    {isImage && previewUrl ? (
                      <div className="relative h-40 w-full">
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => onRemove(file.name)}
                          disabled={disabled}
                          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-muted">
                        {isUploaded ? (
                          <CheckCircle2 className="h-10 w-10 text-green-500" />
                        ) : (
                          <FileIcon className="h-10 w-10 text-muted-foreground" />
                        )}
                        <button
                          type="button"
                          onClick={() => onRemove(file.name)}
                          disabled={disabled}
                          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <div className="space-y-2 p-3">
                      <div className="space-y-1">
                        <p className="truncate text-sm font-medium">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      {!isUploaded && (
                        <Progress value={progress} className="h-2" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };
