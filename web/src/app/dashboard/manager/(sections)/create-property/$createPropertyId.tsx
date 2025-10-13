import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getPropertyDetailsQuery } from './-queries/get-property-details';
import type { PropertySchema } from '@/app/-schemas/property.schema';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/create-property/$createPropertyId',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { createPropertyId } = Route.useParams();
  const { data, isLoading, error } = useQuery(
    getPropertyDetailsQuery(createPropertyId),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
  if (!data) return <div>No property found.</div>;

  const property = data as PropertySchema;

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{property.name}</h2>
      <img
        src={
          property.photoUrls?.[0] ??
          'https://unpic.imgix.net/sample-images/house.jpg'
        }
        alt="Property"
        className="w-full h-56 object-cover rounded mb-4"
      />
      <div className="mb-2">
        <strong>Address:</strong> {property.location?.address ?? 'No Address'}
      </div>
      <div className="mb-2">
        <strong>Description:</strong> {property.description}
      </div>
      <div className="mb-2">
        <strong>Type:</strong> {property.propertyType}
      </div>
      <div className="mb-2">
        <strong>Price/Month:</strong> ₹{property.pricePerMonth}
      </div>
      <div className="mb-2">
        <strong>Security Deposit:</strong> ₹{property.securityDeposit}
      </div>
      <div className="mb-2">
        <strong>Square Feet:</strong> {property.squareFeet}
      </div>
      <div className="mb-2">
        <strong>Beds:</strong> {property.beds} | <strong>Baths:</strong>{' '}
        {property.baths}
      </div>
      <div className="mb-2">
        <strong>Posted:</strong>{' '}
        {property.postedDate
          ? new Date(property.postedDate).toLocaleDateString()
          : 'N/A'}
      </div>
      <div className="mb-2">
        <strong>Pet Allowed:</strong> {property.petAllowed ? 'Yes' : 'No'}
      </div>
      <div className="mb-2">
        <strong>Parking Included:</strong>{' '}
        {property.parkingIncluded ? 'Yes' : 'No'}
      </div>
      <div className="mb-2">
        <strong>Amenities:</strong> {property.amenities.join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Highlights:</strong> {property.highlights.join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Average Ratings:</strong> {property.averageRatings}
      </div>
      <div className="mb-2">
        <strong>Number of Ratings:</strong> {property.numberOfRatings}
      </div>
      <div className="mb-2">
        <strong>Manager ID:</strong> {property.managerId}
      </div>
      <div className="mb-2">
        <strong>Applications:</strong> {property.applicationIds?.length ?? 0}
      </div>
      <div className="mb-2">
        <strong>Property Tenant Payment Application IDs:</strong>{' '}
        {property.propertyTenantPaymentApplicationIds?.length ?? 0}
      </div>
      <div className="mt-4 text-xs text-muted-foreground">
        Property ID: {property.id}
      </div>
    </div>
  );
}
