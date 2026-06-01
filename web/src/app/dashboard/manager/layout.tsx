import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useJoyride } from 'react-joyride';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ManagerDahboardSidebar } from '@/features/app/dashboard/manager/components/sidebar';

const managerTourSteps = [
  {
    target: '.tour-profile',
    content: 'View and edit your personal profile information here.',
  },
  {
    target: '.tour-create-property',
    content:
      'Use this section to list new properties. You can add details, photos, and set pricing.',
  },
  {
    target: '.tour-manage-properties',
    content:
      'Manage all your existing properties here. You can update listings, view applications, and more.',
  },
];

export const Route = createFileRoute('/dashboard/manager')({
  component: RouteComponent,
});

function RouteComponent() {
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps: managerTourSteps,
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(
      'manager-dashboard-tour-v2-completed',
    );
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        controls.start();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [controls]);

  useEffect(() => {
    return on('tour:end', () => {
      localStorage.setItem('manager-dashboard-tour-v2-completed', 'true');
    });
  }, [on]);

  return (
    <SidebarProvider>
      {Tour}
      <ManagerDahboardSidebar />
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
        <div className="flex min-h-screen flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
