import type { ComponentProps } from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { H2, H3, H4, P } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import type { Application } from '@/features/app/-schemas/application.schema';

interface ApplicationDetailsProps extends ComponentProps<typeof Card> {
  data: Application;
}

export const ApplicationDetails = ({
  data,
  className,
  ...props
}: ApplicationDetailsProps) => {
  const { id, startDate, status, tenant, property } = data;

  const manager = property.manager;

  return (
    <Card className={cn('shadow-lg', className)} {...props}>
      <CardHeader>
        <CardTitle>
          <H2>Application Details</H2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <P>
              <span className="font-semibold">Application ID:</span> {id}
            </P>
            <P>
              <span className="font-semibold">Start Date:</span>{' '}
              {new Date(startDate).toLocaleString()}
            </P>
            <P>
              <span className="font-semibold">Status:</span>
              <span
                className={cn(
                  'ml-2 rounded px-2 py-1 text-white',
                  status === 'APPROVED'
                    ? 'bg-green-600'
                    : status === 'DENIED'
                      ? 'bg-red-600'
                      : 'bg-yellow-500',
                )}
              >
                {status}
              </span>
            </P>
          </div>
          <div className="border-t pt-4">
            <H3 className="mb-2">Tenant</H3>
            <div className="grid grid-cols-2 gap-4">
              <P>
                <span className="font-semibold">Name:</span> {tenant.name}
              </P>
              <P>
                <span className="font-semibold">Email:</span> {tenant.email}
              </P>
            </div>
          </div>
          <div className="border-t pt-4">
            <H3 className="mb-2">Property</H3>
            <div className="grid grid-cols-2 gap-4">
              <P>
                <span className="font-semibold">Name:</span> {property.name}
              </P>
              <P>
                <span className="font-semibold">Price Per Month:</span> $
                {property.pricePerMonth}
              </P>
            </div>
            {property.location && (
              <div className="mt-2">
                <H4 className="mb-2">Location</H4>
                <div className="grid grid-cols-2 gap-4">
                  <P>
                    <span className="font-semibold">Address:</span>{' '}
                    {property.location.address}
                  </P>
                  <P>
                    <span className="font-semibold">City:</span>{' '}
                    {property.location.city}
                  </P>
                  <P>
                    <span className="font-semibold">State:</span>{' '}
                    {property.location.state}
                  </P>
                  <P>
                    <span className="font-semibold">Zip:</span>{' '}
                    {property.location.postalCode}
                  </P>
                </div>
              </div>
            )}
            {manager && (
              <div className="mt-2">
                <H4 className="mb-2">Manager</H4>
                <div className="flex items-center gap-4">
                  {manager.avatar && (
                    <img
                      src={manager.avatar}
                      alt={manager.name}
                      className="h-12 w-12 rounded-full border object-cover"
                    />
                  )}
                  <div>
                    <P>
                      <span className="font-semibold">Name:</span>{' '}
                      {manager.name}
                    </P>
                    <P>
                      <span className="font-semibold">Email:</span>{' '}
                      {manager.email}
                    </P>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
