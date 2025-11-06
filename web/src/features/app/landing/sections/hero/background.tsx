import { Image } from '@unpic/react';

export function HeroBackground() {
  return (
    <>
      <Image
        src={'/landing-splash.jpg'}
        alt="Rentiful Hero Section"
        width={1920}
        height={1080}
        className="h-full w-full object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/60" />
    </>
  );
}
