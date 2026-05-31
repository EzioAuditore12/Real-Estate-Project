import { useEffect, useMemo, useRef, type ComponentProps } from 'react';
import {
  MapMarker,
  Map as MapUI,
  type MapRef,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from '@/components/ui/map';
import { cn } from '@/lib/utils';
import { Image } from '@unpic/react';

export interface MapProps extends ComponentProps<'div'> {
  data: MapData;
  properties?: PropertyMapItem[];
}

type MapData = {
  coords: {
    longitude: number;
    latitude: number;
  };
};

type PropertyMapItem = {
  id: string;
  name: string;
  photoUrls?: string[] | null;
  beds?: number | null;
  baths?: number | null;
  location?: {
    city?: string | null;
    state?: string | null;
    country?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    coordinates?: {
      latitude?: number | null;
      longitude?: number | null;
    } | null;
  } | null;
};

/**
 * Wrapper around @mapcn/map so existing usages (`Map` with `data={{ coords }}`)
 * keep working. This simply forwards props into the third-party component.
 */
export function Map({ className, data, properties = [], ...props }: MapProps) {
  const coords = data?.coords;
  const mapRef = useRef<MapRef | null>(null);

  const markerProperties = properties.filter((property) => {
    const latitude =
      property.location?.latitude ?? property.location?.coordinates?.latitude;
    const longitude =
      property.location?.longitude ?? property.location?.coordinates?.longitude;

    return typeof latitude === 'number' && typeof longitude === 'number';
  });

  const markerCoordinates = useMemo(
    () =>
      markerProperties.map((property) => ({
        latitude: (property.location?.latitude ??
          property.location?.coordinates?.latitude) as number,
        longitude: (property.location?.longitude ??
          property.location?.coordinates?.longitude) as number,
      })),
    [markerProperties],
  );

  const markerSignature = useMemo(
    () =>
      markerCoordinates
        .map((point) => `${point.longitude},${point.latitude}`)
        .join('|'),
    [markerCoordinates],
  );

  useEffect(() => {
    if (!mapRef.current || markerCoordinates.length === 0) {
      return;
    }

    if (markerCoordinates.length === 1) {
      const [point] = markerCoordinates;
      mapRef.current.flyTo({
        center: [point.longitude, point.latitude],
        zoom: 14,
        duration: 700,
      });
      return;
    }

    const longitudes = markerCoordinates.map((point) => point.longitude);
    const latitudes = markerCoordinates.map((point) => point.latitude);

    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);

    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 56, duration: 700, maxZoom: 15 },
    );
  }, [markerSignature, markerCoordinates]);

  const center: [number, number] = coords
    ? [coords.longitude, coords.latitude]
    : [-73.98, 40.74];
  const zoom = coords ? 15 : 11;

  return (
    <div className={cn('tour-map-view relative', className)} {...props}>
      <MapUI ref={mapRef} className="h-full" center={center} zoom={zoom}>
        {markerProperties.map((property) => (
          <MapMarker
            key={property.id}
            longitude={
              (property.location!.longitude ??
                property.location!.coordinates!.longitude) as number
            }
            latitude={
              (property.location!.latitude ??
                property.location!.coordinates!.latitude) as number
            }
          >
            <MarkerContent>
              <div className="size-5 cursor-pointer rounded-full border-2 border-white bg-rose-500 shadow-lg transition-transform hover:scale-110" />
              <MarkerLabel position="bottom">{property.name}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="w-62 p-3">
              <div className="space-y-2 p-3">
                <div className="bg-muted relative h-28 overflow-hidden rounded-md">
                  {property.photoUrls?.[0] ? (
                    <Image
                      src={property.photoUrls[0]}
                      alt={property.name}
                      layout="fullWidth"
                      objectFit="cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
                      No image available
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-foreground leading-tight font-semibold">
                    {property.name}
                  </h3>
                  <p className="text-muted-foreground pb-0.5 text-[11px] font-medium tracking-wide uppercase">
                    {[
                      property.location?.city,
                      property.location?.state,
                      property.location?.country,
                    ]
                      .filter(Boolean)
                      .join(', ') || 'Location unavailable'}
                  </p>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                  <span>{property.beds ?? 0} beds</span>
                  <span>{property.baths ?? 0} baths</span>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </MapUI>
    </div>
  );
}
