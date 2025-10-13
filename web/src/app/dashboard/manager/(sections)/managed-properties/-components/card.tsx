import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { PropertySchema } from '@/app/-schemas/property.schema';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

interface PropertyCardProps extends ComponentProps<typeof Card> {
  propertyDetails: PropertySchema;
}

export function PropertyCard({
  className,
  propertyDetails,
  ...props
}: PropertyCardProps) {
  return (
    <Card className={cn('w-full max-w-md mx-auto my-4', className)} {...props}>
      <CardHeader>
        <img
          src={
            propertyDetails.photoUrls?.[0] ??
            'https://unpic.imgix.net/sample-images/house.jpg'
          }
          alt="Property"
          className="w-full h-48 object-cover rounded-md mb-2"
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
