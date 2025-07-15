import { useEffect, useState } from 'react';

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

		if (!navigator.geolocation) return;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
			},
			(err) => {
				alert('Please allow location access to use this feature.');
				console.error('Geolocation error:', err);
			}
		);
	}, [overrideLocation]);

	return location;
};
