import { useRef, useEffect, type ComponentProps } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { env } from '@/env';
import { cn } from '@/lib/utils';

export interface MapProps extends ComponentProps<'div'> {
  data: MapData;
}

type MapData = {
  coords: {
    longitude: number;
    latitude: number;
  };
};

export function Map({ className, data, ...props }: MapProps) {
  const { coords } = data;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = env.VITE_PUBLIC_MAPBOX_API_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.0731952, 30.2872841],
      zoom: 2,
      attributionControl: false,
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && coords) {
      mapRef.current.setCenter([coords.longitude, coords.latitude]);
      mapRef.current.setZoom(15);

      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach((marker) => marker.remove());

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([coords.longitude, coords.latitude])
        .addTo(mapRef.current);
    }
  }, [coords]);

  return (
    <div className={cn('relative', className)} {...props}>
      <div
        ref={mapContainerRef}
        className="h-full w-full"
        style={{ height: '100vh', width: '100%' }}
      />
    </div>
  );
}
