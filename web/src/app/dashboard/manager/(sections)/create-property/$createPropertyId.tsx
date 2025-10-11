import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/create-property/$createPropertyId',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const {createPropertyId} = Route.useParams()

  return (
    <div>
      Hello CreatedProperty {createPropertyId}
      </div>
  )
}
