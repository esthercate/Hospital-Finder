import { useEffect, useState } from 'react';

type LatLng = { lat: number; lng: number };

export const useIpLocation = () => {
  const [location, setLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    const fetchIpLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('IP location failed');
        const data = await res.json();

        if (data.latitude && data.longitude) {
          setLocation({ lat: data.latitude, lng: data.longitude });
        } else {
          console.warn('IP location did not return coordinates');
          setLocation(null);
        }
      } catch (e) {
        console.error('IP-based location error:', e);
        setLocation(null);
      }
    };

    fetchIpLocation();
  }, []);

  return location;
};