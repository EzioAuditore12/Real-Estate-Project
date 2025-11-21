import { Image } from '@unpic/react';

export function NavbarLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.svg"
        alt="Rentiful Logo"
        width={24}
        height={24}
        className="h-6 w-6"
      />
      <div className="text-xl font-bold">
        RENT
        <span className="text-secondary-500 hover:!text-primary-300 font-light">
          IFUL
        </span>
      </div>
    </div>
  );
}
