import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export function HeroSearchBar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Search by city, neighborhood or address"
        className="h-12 w-full max-w-lg rounded-none rounded-l-xl border-none bg-white"
      />
      <Button
        onClick={() => navigate({ to: '/search' })}
        className="h-12 rounded-none rounded-r-xl border-none bg-red-500 text-white hover:bg-red-600"
      >
        Search
      </Button>
    </div>
  );
}
