import { Image } from '@unpic/react';

export function NavbarLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Rentiful Logo"
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <div className="text-xl font-bold">
        RENT
        <span className="text-secondary-500 font-light hover:!text-primary-300">
          IFUL
        </span>
      </div>
    </div>
  );
}
