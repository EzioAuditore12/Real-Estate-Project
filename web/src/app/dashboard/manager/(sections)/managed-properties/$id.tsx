import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { managedPropertyDetailsQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/property-details.query';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading, error } = useQuery(managedPropertyDetailsQuery(id));

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
  if (!data) return <div>No property found.</div>;

  const {
    name,
    photoUrls,
    location,
    description,
    propertyType,
    pricePerMonth,
    securityDeposit,
    squareFeet,
    beds,
    baths,
    postedDate,
    petAllowed,
    parkingIncluded,
    amenities,
    highlights,
    averageRatings,
    numberOfRatings,
    applications,
    id: propertyId,
  } = data;

  console.log(applications.map((application) => application.tenant));

  return (
    <div className="mx-auto my-8 w-full max-w-4xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">{name}</h2>
      <img
        src={
          photoUrls?.[0] ?? 'https://unpic.imgix.net/sample-images/house.jpg'
        }
        alt="Property"
        className="mb-4 h-56 w-full rounded object-cover"
      />
      <div className="mb-2">
        <strong>Address:</strong> {location?.address ?? 'No Address'}
      </div>
      <div className="mb-2">
        <strong>Description:</strong> {description}
      </div>
      <div className="mb-2">
        <strong>Type:</strong> {propertyType}
      </div>
      <div className="mb-2">
        <strong>Price/Month:</strong> ₹{pricePerMonth}
      </div>
      <div className="mb-2">
        <strong>Security Deposit:</strong> ₹{securityDeposit}
      </div>
      <div className="mb-2">
        <strong>Square Feet:</strong> {squareFeet}
      </div>
      <div className="mb-2">
        <strong>Beds:</strong> {beds} | <strong>Baths:</strong> {baths}
      </div>
      <div className="mb-2">
        <strong>Posted:</strong>{' '}
        {postedDate ? new Date(postedDate).toLocaleDateString() : 'N/A'}
      </div>
      <div className="mb-2">
        <strong>Pet Allowed:</strong> {petAllowed ? 'Yes' : 'No'}
      </div>
      <div className="mb-2">
        <strong>Parking Included:</strong> {parkingIncluded ? 'Yes' : 'No'}
      </div>
      <div className="mb-2">
        <strong>Amenities:</strong> {(amenities ?? []).join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Highlights:</strong> {(highlights ?? []).join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Average Ratings:</strong> {averageRatings}
      </div>
      <div className="mb-2">
        <strong>Number of Ratings:</strong> {numberOfRatings}
      </div>
      <div className="mb-2">
        <strong>Applications:</strong> {applications?.length ?? 0}
      </div>

      {applications && applications.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold">Applications</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded border bg-gray-50 p-4 shadow-sm"
                onClick={() =>
                  navigate({
                    to: '/dashboard/manager/managed-properties/application/$id',
                    params: { id: app.id },
                  })
                }
              >
                <div>
                  <strong>Status:</strong> {app.status}
                </div>
                <div>
                  <strong>Start Date:</strong>{' '}
                  {app.startDate
                    ? new Date(app.startDate).toLocaleDateString()
                    : 'N/A'}
                </div>
                {app.tenant && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={
                        app.tenant.avatar ??
                        'https://unpic.imgix.net/sample-images/person.png'
                      }
                      alt={app.tenant.name ?? 'Tenant'}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span>{app.tenant.name ?? 'Unknown Tenant'}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-muted-foreground mt-4 text-xs">
        Property ID: {propertyId}
      </div>
    </div>
  );
}
