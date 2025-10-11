import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Link, useNavigate } from '@tanstack/react-router';
import { NavbarLogo } from './logo';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  const { user, logout } = useAuthStore((state) => state);

  const navigate = useNavigate();

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

        <div className="ml-auto flex items-center gap-5">
          {user ? (
            <>
              <Avatar
                className="cursor-pointer"
                onClick={() => {
                  navigate({ to: '/dashboard' });
                }}
              >
                <AvatarImage src={user.avatar ?? ""} />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>

              <Button
                variant={'destructive'}
                onClick={() => {
                  logout();
                  navigate({ to: '/login/tenant', replace: true });
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={'/login/tenant'}>
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-[#27272a] rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link to={'/register/tenant'}>
                <Button
                  variant="secondary"
                  className="text-white bg-secondary-600 hover:bg-red-500 hover:text- rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
