import type { ComponentProps } from 'react';

import type { PropertySchema } from '@/features/app/-schemas/property.schema';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PropertyCardProps extends ComponentProps<typeof Card> {
  propertyDetails: PropertySchema;
}

export function PropertyCard({
  className,
  propertyDetails,
  ...props
}: PropertyCardProps) {
  const { beds, baths, location, name, amenities, pricePerMonth, photoUrls } =
    propertyDetails;
  const { city, address, state, country } = location;

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="text-muted-foreground text-sm">
          {address}, {city}, {state}, {country}
        </div>
      </CardHeader>
      <CardContent>
        {photoUrls?.[0] && (
          <img
            src={photoUrls[0]}
            alt={name}
            className="mb-4 h-40 w-full rounded object-cover"
          />
        )}
        <div className="mb-2 flex gap-4">
          <Badge variant="secondary">{beds} Beds</Badge>
          <Badge variant="secondary">{baths} Baths</Badge>
          <Badge variant="outline">₹{pricePerMonth}/mo</Badge>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {amenities?.map((amenity: string) => (
            <Badge key={amenity} variant="default">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
