import { Image } from '@unpic/react';

interface DiscoverCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export function DiscoverCard({
  imageSrc,
  title,
  description,
}: DiscoverCardProps) {
  return (
    <div className="bg-primary-50 rounded-lg px-4 py-12 shadow-lg md:h-72">
      <div className="bg-primary-700 mx-auto mb-4 h-10 w-10 rounded-full p-[0.6rem]">
        <Image
          src={imageSrc}
          width={30}
          height={30}
          className="h-full w-full"
          alt={title}
        />
      </div>
      <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
}
