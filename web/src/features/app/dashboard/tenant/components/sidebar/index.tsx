import * as React from 'react';
import { Command, Heart, Map, PieChart, Settings, User } from 'lucide-react';

import { TenantNavItems, type TenantNavItem } from './nav-items';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/store';

const data = {
  projects: [
    {
      name: 'Profile',
      url: '/dashboard/tenant',
      icon: User,
    },
    {
      name: 'Favourites',
      url: '/dashboard/tenant/favourites',
      icon: Heart,
    },
    {
      name: 'Applications',
      url: '/dashboard/tenant/applications',
      icon: PieChart,
    },
    {
      name: 'Residences',
      url: '/dashboard/tenant/residences',
      icon: Map,
    },
    {
      name: 'Settings',
      url: '/dashboard/tenant/settings',
      icon: Settings,
    },
  ] as TenantNavItem[],
};

export function TenantDahboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/landing">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Rentiful</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <TenantNavItems projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          avatar=""
          logout={() => {
            logout();
            navigate({ to: '/landing', replace: true });
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
