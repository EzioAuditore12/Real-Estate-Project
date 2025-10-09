import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';

export function useGetGeoLocation() {
    const [hasShownAvailabilityAlert, setHasShownAvailabilityAlert] = useState(false);
    const [hasShownEnabledAlert, setHasShownEnabledAlert] = useState(false);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        if (isGeolocationAvailable === false && !hasShownAvailabilityAlert) {
            alert("Current device does not support geo location");
            setHasShownAvailabilityAlert(true);
        }
    }, [isGeolocationAvailable, hasShownAvailabilityAlert]);

    useEffect(() => {
        if (isGeolocationEnabled === false && !hasShownEnabledAlert) {
            alert("Need to enable geo service in browser in order to get started");
            setHasShownEnabledAlert(true);
        }
    }, [isGeolocationEnabled, hasShownEnabledAlert]);

    return {
        isGeolocationAvailable,
        isGeolocationEnabled,
        coords,
    };
}