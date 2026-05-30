import { useState, useEffect } from 'react';
import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SearchPropertyQueryParams } from '@/features/app/non-dashboard/search/schemas/property/search-property-params.schema';

interface PropertyFiltersProps {
  filters: SearchPropertyQueryParams;
  onChange: <K extends keyof SearchPropertyQueryParams>(
    key: K,
    value: SearchPropertyQueryParams[K],
  ) => void;
}

export function PropertyFilters({ filters, onChange }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [localBeds, setLocalBeds] = useState(
    filters.beds?.gte?.toString() ?? 'any',
  );
  const [localBaths, setLocalBaths] = useState(
    filters.baths?.gte?.toString() ?? 'any',
  );
  const [localSquareFeet, setLocalSquareFeet] = useState(
    filters.squareFeet?.gte?.toString() ?? 'any',
  );
  const [minPrice, setMinPrice] = useState(
    filters.pricePerMonth?.gte?.toString() ?? '',
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.pricePerMonth?.lte?.toString() ?? '',
  );

  useEffect(() => {
    if (isOpen) {
      setLocalBeds(filters.beds?.gte?.toString() ?? 'any');
      setLocalBaths(filters.baths?.gte?.toString() ?? 'any');
      setLocalSquareFeet(filters.squareFeet?.gte?.toString() ?? 'any');
      setMinPrice(filters.pricePerMonth?.gte?.toString() ?? '');
      setMaxPrice(filters.pricePerMonth?.lte?.toString() ?? '');
    }
  }, [filters, isOpen]);

  const handleSave = () => {
    onChange(
      'beds',
      localBeds === 'any' ? undefined : { gte: Number(localBeds) },
    );
    onChange(
      'baths',
      localBaths === 'any' ? undefined : { gte: Number(localBaths) },
    );
    onChange(
      'squareFeet',
      localSquareFeet === 'any' ? undefined : { gte: Number(localSquareFeet) },
    );

    const priceFilter = {
      ...(minPrice && { gte: Number(minPrice) }),
      ...(maxPrice && { lte: Number(maxPrice) }),
    };
    onChange(
      'pricePerMonth',
      Object.keys(priceFilter).length > 0 ? priceFilter : undefined,
    );

    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocalBeds('any');
    setLocalBaths('any');
    setLocalSquareFeet('any');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filters
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Clear all
            </Button>
          </SheetTitle>
          <SheetDescription>
            Refine your property search results.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="beds">Bedrooms</Label>
            <Select value={localBeds} onValueChange={setLocalBeds}>
              <SelectTrigger id="beds">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="baths">Bathrooms</Label>
            <Select value={localBaths} onValueChange={setLocalBaths}>
              <SelectTrigger id="baths">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Price per Month</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Square Feet</Label>
            <Select value={localSquareFeet} onValueChange={setLocalSquareFeet}>
              <SelectTrigger id="squareFeet">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="500">500+ sqft</SelectItem>
                <SelectItem value="1000">1000+ sqft</SelectItem>
                <SelectItem value="1500">1500+ sqft</SelectItem>
                <SelectItem value="2000">2000+ sqft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="mt-4">
          <Button onClick={handleSave}>Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
