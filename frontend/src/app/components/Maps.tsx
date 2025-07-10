'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Container from './common/Container';
import Title from './common/Title';
import { HospitalCard, Hospital } from './HospitalCard';

const containerStyle = {
	width: '100%',
	height: '600px',
};

const Maps = () => {
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [hospitals, setHospitals] = useState<Hospital[]>([]);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	useEffect(() => {
		if (!navigator.geolocation) return;

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const coords = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				};
				setUserLocation(coords);
			},
			(err) => {
				alert('Please allow location access to use this feature.');
				console.error('❌ Geolocation error:', err);
			}
		);
	}, []);

	useEffect(() => {
		if (!userLocation) return;

		const fetchHospitals = async () => {
			const res = await fetch(
				`/api/places?lat=${userLocation.lat}&lng=${userLocation.lng}`
			);
			const data = await res.json();

			console.log('📦 Raw hospital data:', data.results || data.hospitals); // Debug
			const hospitalsWithCoords = (data.results || []).map((place: any) => ({
				name: place.name,
				lat: place.geometry?.location?.lat,
				lng: place.geometry?.location?.lng,
				vicinity: place.vicinity,
				rating: place.rating,
				open: place.opening_hours?.open_now,
			}));

			console.log('✅ Transformed hospitals:', hospitalsWithCoords);
			setHospitals(hospitalsWithCoords);
		};

		fetchHospitals();
	}, [userLocation]);

	if (loadError) return <p>Error loading maps</p>;
	if (!isLoaded || !userLocation) return <p>Loading map...</p>;

	return (
		<section id="find-hospital">
			<Container className="py-5 md:py-10">
				<Title
					title="Nearby Hospitals"
					description="Find hospitals near your current location."
				/>
				<div className="flex gap-5 my-8">
					<div className="w-3/4">
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={userLocation}
							zoom={13}
						>
							<Marker
								position={userLocation}
								label="You"
							/>
							{hospitals.map((hospital, i) => (
								<Marker
									key={i}
									position={{ lat: hospital.lat, lng: hospital.lng }}
									label={hospital.name}
								/>
							))}
						</GoogleMap>
					</div>
					<div className="w-1/4 flex flex-col gap-2 max-h-[600px] overflow-y-auto">
						{hospitals.length === 0 && <p>No hospitals found nearby.</p>}
						{hospitals.map((hospital, i) => (
							<HospitalCard
								key={i}
								hospital={hospital}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Maps;
