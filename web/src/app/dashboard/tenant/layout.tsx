import { createFileRoute, Outlet } from '@tanstack/react-router';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { TenantDahboardSidebar } from './-components/sidebar';

export const Route = createFileRoute('/dashboard/tenant')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <TenantDahboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="min-h-screen flex flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
