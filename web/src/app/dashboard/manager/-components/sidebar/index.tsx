import * as React from 'react';
import { Command, Map,User } from 'lucide-react';

import {ManagerNavItems, type ManagerNavItem } from './nav-items';
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
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/store';

const data = {
  projects: [
    {
      name: 'Profile',
      url: '/dashboard/manager',
      icon: User,
    },
    {
      name: 'Create Property',
      url: '/dashboard/manager/create-property',
      icon: Map,
    },
  ] as ManagerNavItem[],
};

export function ManagerDahboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ManagerNavItems projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          name={user?.name ?? ''}
          email={user?.email ?? ''}
          avatar=""
          logout={logout}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
