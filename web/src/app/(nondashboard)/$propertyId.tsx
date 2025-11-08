import { Button } from '@/components/ui/button';
import { propertyDetailsQuery } from '@/features/app/-queries/property-details.query';
import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(nondashboard)/$propertyId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { propertyId } = Route.useParams();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery(propertyDetailsQuery(propertyId));

  const role = useAuthStore((state) => state.role);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property details.</div>;
  if (!property) return <div>No property found.</div>;

  return (
    <div className="mx-auto my-8 w-full max-w-4xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">{property.name}</h2>
      <img
        src={
          property.photoUrls?.[0] ??
          'https://unpic.imgix.net/sample-images/house.jpg'
        }
        alt="Property"
        className="mb-4 h-56 w-full rounded object-cover"
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
        <strong>Amenities:</strong>{' '}
        {(property.amenities ?? []).join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Highlights:</strong>{' '}
        {(property.highlights ?? []).join(', ') || 'None'}
      </div>
      <div className="mb-2">
        <strong>Average Ratings:</strong> {property.averageRatings}
      </div>
      <div className="mb-2">
        <strong>Number of Ratings:</strong> {property.numberOfRatings}
      </div>
      <div className="mb-2"></div>
      <div className="mb-2">
        <strong>Applications:</strong> {property.applications?.length ?? 0}
      </div>
      <div className="mb-2">
        <strong>Property Tenant Payment Application IDs:</strong>{' '}
        {property.propertyTenantPaymentApplicationIds?.length ?? 0}
      </div>
      <div className="text-muted-foreground mt-4 text-xs">
        Property ID: {property.id}
      </div>

      {role === 'TENANT' && (
        <Button variant={'destructive'}>Apply for property</Button>
      )}
    </div>
  );
}
