import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  Home,
  ShieldCheck,
} from 'lucide-react';

interface ManagerDetailsProps {
  manager: {
    id: string;
    avatar: string | null;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phoneNumber?: string;
    createdAt?: string;
    managedPropertiesCount?: number;
    managedProperties?: string[];
  };
  showEditButton?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function ManagerDetails({
  manager,
  showEditButton = false,
  onEdit,
  className = '',
}: ManagerDetailsProps) {
  const displayName =
    manager.name ||
    `${manager.firstName || ''} ${manager.lastName || ''}`.trim() ||
    'Unknown User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card
      className={`w-full max-w-3xl overflow-hidden border-none shadow-lg ${className}`}
    >
      {/* Decorative Header Banner */}
      <div className="relative h-32 w-full bg-gradient-to-r from-blue-600 to-indigo-600">
        {showEditButton && (
          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="shadow-sm"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      <CardContent className="px-8 pt-0 pb-8 sm:px-10 sm:pb-10">
        {/* Avatar and Basic Info */}
        <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row sm:items-end sm:space-x-5">
          <Avatar className="h-32 w-32 rounded-xl border-4 border-white shadow-md">
            <AvatarImage
              src={manager.avatar ?? ''}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="rounded-xl bg-slate-100 text-3xl font-bold text-slate-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 flex-1 space-y-1 sm:mt-0 sm:pb-2">
            <h3 className="text-3xl font-bold text-slate-800">{displayName}</h3>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              >
                <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                Property Manager
              </Badge>
              {manager.createdAt && (
                <span className="flex items-center text-sm text-slate-500">
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  Joined{' '}
                  {new Date(manager.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-5">
            <h4 className="flex items-center text-lg font-semibold text-slate-800">
              <User className="mr-2 h-5 w-5 text-slate-400" />
              Contact Information
            </h4>
            <div className="space-y-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-start space-x-3 overflow-hidden">
                <div className="mt-0.5 shrink-0 rounded-md bg-white p-2 shadow-sm">
                  <Mail className="h-4 w-4 text-blue-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                    Email Address
                  </p>
                  <p
                    className="truncate font-medium text-slate-800"
                    title={manager.email}
                  >
                    {manager.email}
                  </p>
                </div>
              </div>

              {manager.phoneNumber && (
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 rounded-md bg-white p-2 shadow-sm">
                    <Phone className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                      Phone Number
                    </p>
                    <p className="font-medium text-slate-800">
                      {manager.phoneNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-5">
            <h4 className="flex items-center text-lg font-semibold text-slate-800">
              <Home className="mr-2 h-5 w-5 text-slate-400" />
              Portfolio Overview
            </h4>
            <div className="flex h-[120px] flex-col justify-center rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Home className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-indigo-900">
                    {manager.managedPropertiesCount ??
                      manager.managedProperties?.length ??
                      0}
                  </p>
                  <p className="text-sm font-medium text-indigo-600/80">
                    Properties Managed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Manager ID for reference */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400">
            System ID:{' '}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-500">
              {manager.id}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
