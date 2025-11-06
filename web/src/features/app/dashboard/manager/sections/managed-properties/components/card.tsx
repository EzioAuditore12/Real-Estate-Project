import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';


import type { PropertySchema } from '@/features/app/-schemas/property.schema';

interface PropertyCardProps extends ComponentProps<typeof Card> {
  propertyDetails: PropertySchema;
}

export function PropertyCard({
  className,
  propertyDetails,
  ...props
}: PropertyCardProps) {
  return (
    <Card className={cn('mx-auto my-4 w-full max-w-md', className)} {...props}>
      <CardHeader>
        <img
          src={
            propertyDetails.photoUrls?.[0] ??
            'https://unpic.imgix.net/sample-images/house.jpg'
          }
          alt="Property"
          className="mb-2 h-48 w-full rounded-md object-cover"
        />
        <CardTitle>
          {propertyDetails.location?.address ?? 'No Address'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <strong>Type:</strong> {propertyDetails.propertyType}
        </div>
        <div>
          <strong>Price/Month:</strong> ₹{propertyDetails.pricePerMonth}
        </div>
        <div>
          <strong>Square Feet:</strong> {propertyDetails.squareFeet}
        </div>
        <div>
          <strong>Beds:</strong> {propertyDetails.beds} |{' '}
          <strong>Baths:</strong> {propertyDetails.baths}
        </div>
        <div>
          <strong>Posted:</strong>{' '}
          {propertyDetails.postedDate
            ? new Date(propertyDetails.postedDate).toLocaleDateString()
            : 'N/A'}
        </div>
      </CardContent>
    </Card>
  );
}
