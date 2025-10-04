import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function HeroSearchBar() {
  return (
    <div className="flex justify-center">
      <Input
        type="text"
        placeholder="Search by city, neighborhood or address"
        className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
      />
      <Button className="bg-red-500 text-white rounded-none rounded-r-xl border-none hover:bg-red-600 h-12">
        Search
      </Button>
    </div>
  );
}
