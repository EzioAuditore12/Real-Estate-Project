import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { managedPropertyDetailsQuery } from '@/features/app/dashboard/manager/sections/managed-properties/queries/property-details.query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useJoyride } from 'react-joyride';

export const Route = createFileRoute(
  '/dashboard/manager/(sections)/managed-properties/$id',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const tourSteps = useMemo(
    () => [
      {
        target: '.tour-applications-section',
        content:
          'Here you can view all applications submitted for this property. Click on any application to view details and respond.',
      },
    ],
    [],
  );

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    options: {
      showProgress: true,
      skipScroll: true,
      skipBeacon: true,
    },
    steps: tourSteps,
  });

  const { data, isLoading, error } = useQuery(managedPropertyDetailsQuery(id));

  useEffect(() => {
    if (!data?.applications || data.applications.length === 0) return;

    const hasSeenTour = localStorage.getItem('manager-property-details-tour');
    if (!hasSeenTour) {
      setTimeout(() => {
        controls.start();
      }, 500);
    }

    return on('tour:end', () => {
      localStorage.setItem('manager-property-details-tour', 'true');
    });
  }, [data?.applications, controls, on]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Error loading property details.
      </div>
    );
  if (!data) return <div className="p-8 text-center">No property found.</div>;

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

  return (
    <>
      {Tour}
      <div className="mx-auto my-8 w-full max-w-6xl rounded-lg bg-white p-6 shadow">
        <h2 className="mb-6 text-3xl font-bold text-slate-800">{name}</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left Side: Carousel and Description */}
          <div className="flex flex-col gap-6">
            <Carousel className="w-full">
              <CarouselContent>
                {photoUrls && photoUrls.length > 0 ? (
                  photoUrls.map((url, index) => (
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
                {description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Right Side: Property Details */}
          <div className="flex flex-col gap-6 rounded-lg border border-slate-100 bg-slate-50 p-6 shadow-sm">
            <div>
              <h3 className="text-primary text-3xl font-bold">
                ₹{pricePerMonth}
                <span className="text-base font-normal text-slate-500">
                  {' '}
                  / month
                </span>
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Security Deposit: ₹{securityDeposit}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-slate-200 py-5">
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Property Type
                </p>
                <p className="font-medium text-slate-800">{propertyType}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Beds / Baths
                </p>
                <p className="font-medium text-slate-800">
                  {beds} / {baths}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Square Feet
                </p>
                <p className="font-medium text-slate-800">{squareFeet}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Posted Date
                </p>
                <p className="font-medium text-slate-800">
                  {postedDate
                    ? new Date(postedDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-slate-800">Location</h4>
              <p className="text-sm text-slate-600">
                {location?.address ?? 'No Address provided'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-slate-700">
                  Pet Allowed:
                </span>
                <span className="ml-2 text-sm text-slate-600">
                  {petAllowed ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-slate-700">
                  Parking:
                </span>
                <span className="ml-2 text-sm text-slate-600">
                  {parkingIncluded ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {amenities && amenities.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, i) => (
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

            {highlights && highlights.length > 0 && (
              <div>
                <h4 className="mb-2 font-semibold text-slate-800">
                  Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((highlight, i) => (
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
                  Ratings: {averageRatings} ({numberOfRatings} reviews)
                </span>
                <span>ID: {propertyId}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-500">
                <span>Applications: {applications?.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        {applications && applications.length > 0 && (
          <div className="tour-applications-section mt-8">
            <h3 className="mb-4 text-xl font-bold text-slate-800">
              Applications
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="cursor-pointer rounded-lg border bg-gray-50 p-5 shadow-sm transition-colors hover:bg-gray-100"
                  onClick={() =>
                    navigate({
                      to: '/dashboard/manager/managed-properties/application/$id',
                      params: { id: app.id },
                    })
                  }
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Status</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="mb-3 text-sm text-slate-600">
                    <strong className="font-semibold text-slate-700">
                      Start Date:
                    </strong>{' '}
                    {app.startDate
                      ? new Date(app.startDate).toLocaleDateString()
                      : 'N/A'}
                  </div>
                  {app.tenant && (
                    <div className="flex items-center gap-3 border-t pt-3">
                      <img
                        src={
                          app.tenant.avatar ??
                          'https://unpic.imgix.net/sample-images/person.png'
                        }
                        alt={app.tenant.name ?? 'Tenant'}
                        className="h-10 w-10 rounded-full border object-cover"
                      />
                      <span className="font-medium text-slate-800">
                        {app.tenant.name ?? 'Unknown Tenant'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
