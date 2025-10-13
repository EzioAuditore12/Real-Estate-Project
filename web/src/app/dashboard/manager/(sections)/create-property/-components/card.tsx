import type { ComponentProps } from 'react';

import { Card } from '@/components/ui/card';

import type { PropertyResponse } from '../-schemas/property-response.schema';

interface CreatedPropertyDetailsCardProps extends ComponentProps<typeof Card> {
  propertyDetails: PropertyResponse;
}

export const CreatedPropertyDetailsCard = ({
  className,
  propertyDetails,
  ...props
}: CreatedPropertyDetailsCardProps) => {
  const {
    name,
    description,
    pricePerMonth,
    securityDeposit,
    photoUrls,
    amenities,
    highlights,
    petAllowed,
    parkingIncluded,
    beds,
    baths,
    squareFeet,
    postedDate,
    averageRatings,
    numberOfRatings,
    applicationIds,
    propertyTenantPaymentApplicationIds,
  } = propertyDetails;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (iso?: string | null) => {
    if (!iso) return '—';
    try {
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const firstPhoto =
    photoUrls && photoUrls.length > 0
      ? (photoUrls.find(Boolean) ?? null)
      : null;

  return (
    <Card
      className={[className ?? '', 'max-w-2xl'].join(' ').trim()}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-48 w-full h-40 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          {firstPhoto ? (
            <img
              src={firstPhoto}
              alt={name ?? 'property photo'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              No photo
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">
                {formatCurrency(pricePerMonth)}/mo
              </div>
              <div className="text-sm text-gray-500">
                Deposit: {formatCurrency(securityDeposit)}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div>Beds: {beds}</div>
            <div>Baths: {baths}</div>
            <div>Square ft: {squareFeet}</div>
            <div>Posted: {formatDate(postedDate)}</div>
            <div>Pet allowed: {petAllowed ? 'Yes' : 'No'}</div>
            <div>Parking: {parkingIncluded ? 'Included' : 'Not included'}</div>
          </div>

          <div className="mt-3 text-sm">
            <div className="font-medium">Ratings</div>
            <div className="text-gray-700">
              {averageRatings?.toFixed?.(1) ?? '—'} ({numberOfRatings ?? 0}{' '}
              reviews)
            </div>
          </div>

          <div className="mt-3 text-sm">
            <div className="font-medium">Amenities</div>
            <div className="text-gray-700">
              {amenities && amenities.length > 0
                ? amenities.join(', ')
                : 'None'}
            </div>
          </div>

          <div className="mt-2 text-sm">
            <div className="font-medium">Highlights</div>
            <div className="text-gray-700">
              {highlights && highlights.length > 0
                ? highlights.join(', ')
                : 'None'}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <div>Applications: {applicationIds?.length ?? 0}</div>
            <div>
              Payment applications:{' '}
              {propertyTenantPaymentApplicationIds?.length ?? 0}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
