import { useEffect, useState } from 'react';

const FALLBACK_LOCATION = { lat: -1.286389, lng: 36.817223 }; // Set Nairobi as the fallback location

export const useUserLocation = (
  overrideLocation?: { lat: number; lng: number } | null
) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (overrideLocation) {
      setLocation(overrideLocation);
      return;
    }

    if (!navigator.geolocation) {
      console.warn('Geolocation not supported, using fallback location.');
      setLocation(FALLBACK_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        alert('Could not get your location. Showing a default area instead.');
        console.error('Geolocation error:', err);
        setLocation(FALLBACK_LOCATION); // <-- key change
      }
    );
  }, [overrideLocation]);

  return location;
};