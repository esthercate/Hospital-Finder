// hooks/useHospitalData.ts
import { useEffect, useState } from 'react';
import { Hospital } from '../components/HospitalCard';
import { getEmergencyDisplayCode } from '../utils/getEmergencyDisplayCode';

interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

interface GeocodeResult {
	address_components: AddressComponent[];
}

interface GeocodeResponse {
	results: GeocodeResult[];
}

interface PlaceResult {
	name: string;
	geometry: {
		location: {
			lat: number;
			lng: number;
		};
	};
	vicinity?: string;
	rating?: number;
	opening_hours?: {
		open_now?: boolean;
	};
}

interface PlacesApiResponse {
	results: PlaceResult[];
}

export const useHospitalData = (
	location: { lat: number; lng: number } | null
) => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);

	useEffect(() => {
		if (!location) return;

		const fetchData = async () => {
			try {
				// Fetch emergency info
				const geoRes = await fetch(
					`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
				);
				const geoData: GeocodeResponse = await geoRes.json();

				const countryComponent = geoData.results
					.flatMap((res: GeocodeResult) => res.address_components)
					.find((comp: AddressComponent) => comp.types.includes('country'));

				const countryCode = countryComponent?.short_name;

				if (countryCode) {
					const emerRes = await fetch(`/api/emergency?code=${countryCode}`);
					const emerData = await emerRes.json();
					if (emerData.data) {
						const formatted = getEmergencyDisplayCode(emerData.data);
						localStorage.setItem('emergencyNumber', formatted);
					}
				}

				// Fetch hospitals
				const res = await fetch(
					`/api/places?lat=${location.lat}&lng=${location.lng}`
				);
				const data: PlacesApiResponse = await res.json();

				const hospitalsWithCoords = (data.results || []).map(
					(place: PlaceResult) => ({
						name: place.name,
						lat: place.geometry?.location?.lat,
						lng: place.geometry?.location?.lng,
						vicinity: place.vicinity,
						rating: place.rating,
						open: place.opening_hours?.open_now,
					})
				);

				setHospitals(hospitalsWithCoords);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [location]);

	return hospitals;
};
