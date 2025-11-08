import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function HeroSearchBar() {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Search by city, neighborhood or address"
        className="h-12 w-full max-w-lg rounded-none rounded-l-xl border-none bg-white"
      />
      <Button
        onClick={() => console.log('search clicked')}
        className="h-12 rounded-none rounded-r-xl border-none bg-red-500 text-white hover:bg-red-600"
      >
        Search
      </Button>
    </div>
  );
}
