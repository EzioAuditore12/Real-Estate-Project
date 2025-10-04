import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Link } from '@tanstack/react-router';
import { NavbarLogo } from './logo';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-[#27272a] text-white">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Menu Items */}
          <Link to={'/'}>
            <NavbarLogo />
          </Link>
          <p className="text-primary-200 hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="ml-auto flex items-center gap-5">
          <Link to={'/login/tenant'}>
            <Button
              variant="outline"
              className="text-white border-white bg-transparent hover:bg-white hover:text-[#27272a] rounded-lg"
            >
              Sign In
            </Button>
          </Link>
          <Link to={'/register'}>
            <Button
              variant="secondary"
              className="text-white bg-secondary-600 hover:bg-red-500 hover:text- rounded-lg"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
