import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Calendar, Edit, Heart, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TenantDetailsProps {
  tenant: {
    id: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phoneNumber?: string;
    createdAt?: string;
    favourites?: string[];
    properties?: string[];
  };
  showEditButton?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function TenantDetails({
  tenant,
  showEditButton = false,
  onEdit,
  className = '',
}: TenantDetailsProps) {
  const displayName =
    tenant.name ||
    `${tenant.firstName || ''} ${tenant.lastName || ''}`.trim() ||
    'Unknown User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Tenant Profile</CardTitle>
          {showEditButton && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{displayName}</h3>
            <Badge variant="secondary" className="text-xs">
              <User className="mr-1 h-3 w-3" />
              Tenant
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Contact Information</h4>

          <div className="grid gap-3">
            <div className="flex items-center space-x-3">
              <Mail className="text-muted-foreground h-5 w-5" />
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="font-medium">{tenant.email}</p>
              </div>
            </div>

            {tenant.phoneNumber && (
              <div className="flex items-center space-x-3">
                <Phone className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p className="font-medium">{tenant.phoneNumber}</p>
                </div>
              </div>
            )}

            {tenant.createdAt && (
              <div className="flex items-center space-x-3">
                <Calendar className="text-muted-foreground h-5 w-5" />
                <div>
                  <p className="text-muted-foreground text-sm">Member Since</p>
                  <p className="font-medium">
                    {new Date(tenant.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Statistics */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Statistics</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold">
                {tenant.favourites?.length || 0}
              </p>
              <p className="text-muted-foreground text-sm">Favorites</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="mb-2 flex items-center justify-center">
                <Home className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">
                {tenant.properties?.length || 0}
              </p>
              <p className="text-muted-foreground text-sm">Properties</p>
            </div>
          </div>
        </div>

        {/* Tenant ID for reference */}
        <div className="border-border/50 border-t pt-4">
          <p className="text-muted-foreground text-xs">
            Tenant ID: <span className="font-mono">{tenant.id}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
