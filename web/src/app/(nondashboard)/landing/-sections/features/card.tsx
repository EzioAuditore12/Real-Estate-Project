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
      <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          className="w-full h-full object-contain"
          alt={title}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link
        to={linkHref}
        className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
      >
        {linkText}
      </Link>
    </div>
  );
}
