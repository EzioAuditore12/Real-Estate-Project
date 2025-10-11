import { createFileRoute } from '@tanstack/react-router'

import { CreatePropertyForm } from './-components/form'
import { useCreatePropertyForm } from './-hooks/use-create-property-form'

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/create-property/',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const { mutate, isPending } = useCreatePropertyForm()

  return <div className='p-2 min-h-screen flex flex-1 justify-center items-center'>
    <CreatePropertyForm
    handleSubmit={mutate}
    isRequestPending={isPending}
    className='w-full'
    />
  </div>
}
