import type { ComponentProps } from 'react';
import { useNavigate } from '@tanstack/react-router';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { Application } from '@/app/-schemas/application.schema';

interface ApplicationCardProps extends ComponentProps<typeof Card> {
  data: Application;
}

export function ApplicationCard({
  data,
  className,
  ...props
}: ApplicationCardProps) {
  const navigate = useNavigate();

  const { property, status, startDate } = data;

  const location = property.location;

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>{property.name}</CardTitle>
        <Badge
          variant={
            status == 'APPROVED'
              ? 'secondary'
              : data.status === 'PENDING'
                ? 'default'
                : 'destructive'
          }
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <span>Submitted: {startDate}</span>
          {location && (
            <div className="mt-2">
              <span className="font-semibold">Location:</span>{' '}
              {location.address}, {location.city}, {location.state}{' '}
              {location.postalCode}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() =>
            navigate({
              to: '/dashboard/tenant/applications/$id',
              params: { id: data.id },
            })
          }
          variant="outline"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
