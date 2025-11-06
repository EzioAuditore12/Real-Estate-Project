import { Image } from '@unpic/react';
import { Link, type LinkProps } from '@tanstack/react-router';

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: LinkProps['href'];
}

export function FeatureCard({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="mb-4 flex h-48 items-center justify-center rounded-lg p-4">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          className="h-full w-full object-contain"
          alt={title}
        />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        to={linkHref}
        className="inline-block rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
      >
        {linkText}
      </Link>
    </div>
  );
}
