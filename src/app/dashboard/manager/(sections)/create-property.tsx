import { createFileRoute } from '@tanstack/react-router';

import { CreatePropertyForm } from '@/features/app/dashboard/manager/sections/create-property/components/form';
import { useCreatePropertyForm } from '@/features/app/dashboard/manager/sections/create-property/hooks/use-create-property-form';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/create-property',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useCreatePropertyForm();

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center p-2">
      <CreatePropertyForm
        handleSubmit={mutate}
        isRequestPending={isPending}
        className="w-full"
      />
    </div>
  );
}
