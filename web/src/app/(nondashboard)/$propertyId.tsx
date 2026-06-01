import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { propertyDetailsQuery } from '@/features/app/-queries/property-details.query';
import { useCreateApplication } from '@/features/app/property/hooks/use-create-application';
import { useAuthStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useJoyride } from 'react-joyride';

const propertyTourSteps = [
  {
    target: '.tour-property-details',
    content:
      'Here you can view all the details about the property, including its price, location, and amenities.',
  },
  {
    target: '.tour-apply-button',
    content: 'If you are a tenant, you can apply for this property here.',
  },
];

export const Route = createFileRoute('/(nondashboard)/$propertyId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { propertyId } = Route.useParams();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    error,
  } = useQuery(propertyDetailsQuery(propertyId));

  const { mutate, isPending } = useCreateApplication();

  const role = useAuthStore((state) => state.role);

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps: propertyTourSteps,
  });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('property-page-tour-completed');
    if (!hasSeenTour) {
      controls.start();
    }

    return on('tour:end', () => {
      localStorage.setItem('property-page-tour-completed', 'true');
      if (role === 'MANAGER') {
        navigate({ to: '/dashboard/manager' });
      }
    });
  }, [controls, on, navigate, role]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading property details.
      </div>
    );
  if (!property)
    return <div className="p-8 text-center">No property found.</div>;

  return (
    <>
      {Tour}
      <div className="mx-auto my-18 w-full max-w-6xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">
          {property.name}
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left Side: Carousel and Description */}
          <div className="flex flex-col gap-6">
            <Carousel className="w-full">
              <CarouselContent>
                {property.photoUrls && property.photoUrls.length > 0 ? (
                  property.photoUrls.map((url, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={url ?? ''}
                        alt={`Property ${index + 1}`}
                        className="aspect-video w-full rounded-lg object-cover shadow-sm"
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem>
                    <img
                      src="https://unpic.imgix.net/sample-images/house.jpg"
                      alt="Property placeholder"
                      className="aspect-video w-full rounded-lg object-cover shadow-sm"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              {/* Nav buttons placed inside with absolute positioning to avoid overflow issues */}
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            <div className="rounded-lg border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold text-slate-800">
                Description
              </h3>
              <p className="whitespace-pre-wrap text-slate-600">
                {property.description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Right Side: Property Details */}
          <div className="tour-property-details flex flex-col gap-6 rounded-lg border border-slate-100 bg-slate-50 p-6 shadow-sm">
            <div>
              <h3 className="text-primary text-3xl font-bold">
                ₹{property.pricePerMonth}
                <span className="text-base font-normal text-slate-500">
                  {' '}
                  / month
                </span>
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Security Deposit: ₹{property.securityDeposit}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-200 py-5">
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Property Type
                </p>
                <p className="font-medium text-slate-800">
                  {property.propertyType}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Beds / Baths
                </p>
                <p className="font-medium text-slate-800">
                  {property.beds} / {property.baths}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Square Feet
                </p>
                <p className="font-medium text-slate-800">
                  {property.squareFeet}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Posted Date
                </p>
                <p className="font-medium text-slate-800">
                  {property.postedDate
                    ? new Date(property.postedDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-slate-800">Location</h4>
              <p className="text-sm text-slate-600">
                {property.location?.address ?? 'No Address provided'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-slate-700">
                  Pet Allowed:
                </span>
                <span className="ml-2 text-sm text-slate-600">
                  {property.petAllowed ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-slate-700">
                  Parking:
                </span>
                <span className="ml-2 text-sm text-slate-600">
                  {property.parkingIncluded ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {property.highlights && property.highlights.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary rounded px-2.5 py-1 text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-4 pt-4">
              <div className="flex justify-between text-xs text-slate-500">
                <span>
                  Ratings: {property.averageRatings} ({property.numberOfRatings}{' '}
                  reviews)
                </span>
                <span>ID: {property.id}</span>
              </div>

              {role === 'TENANT' ? (
                <Button
                  onClick={() => mutate(property.id)}
                  disabled={isPending}
                  className="tour-apply-button w-full py-6 text-lg font-semibold shadow-sm"
                >
                  {isPending ? 'Applying...' : 'Apply For Property'}
                </Button>
              ) : role === 'MANAGER' ? (
                <div className="tour-apply-button w-full rounded-md border border-slate-200 bg-slate-100 py-4 text-center text-sm font-medium text-slate-500 shadow-sm">
                  You can apply for property if you are tenant
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
