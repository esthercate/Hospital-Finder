'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Container from './common/Container';
import Title from './common/Title';
import { HospitalCard, Hospital } from './HospitalCard';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const Maps = () => {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const [map, setMap] = useState<mapboxgl.Map | null>(null);
	const [userLocation, setUserLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	const [hospitals, setHospitals] = useState<Hospital[]>([]);

	// Step 1: Get user location
	useEffect(() => {
		if (!navigator.geolocation) {
			console.error('❌ Geolocation not supported.');
			return;
		}

		console.log('📍 Requesting user location...');
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const coords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				console.log('User location received:', coords);
				setUserLocation(coords);
			},
			(err) => {
				console.error('Geolocation error:', {
					code: err.code,
					message: err.message,
				});
				alert('Please allow location access to use the hospital finder.');
			},
			{ enableHighAccuracy: true, timeout: 10000 }
		);
	}, []);

	// Step 2: Initialize map when location is ready
	useEffect(() => {
		if (!userLocation || map) return;

		console.log('Initializing map at:', userLocation);
		const mapInstance = new mapboxgl.Map({
			container: mapContainerRef.current!,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [userLocation.lng, userLocation.lat],
			zoom: 13,
		});

		// Add blue user marker
		new mapboxgl.Marker({ color: 'blue' })
			.setLngLat([userLocation.lng, userLocation.lat])
			.setPopup(new mapboxgl.Popup().setText('You are here'))
			.addTo(mapInstance);

		setMap(mapInstance);

		// Fetch hospitals nearby
		fetchNearbyHospitals(userLocation, mapInstance);
	}, [userLocation]);

	// Step 3: Fetch hospitals and add red markers
	const fetchNearbyHospitals = async (
		location: { lat: number; lng: number },
		mapInstance: mapboxgl.Map
	) => {
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${location.lng},${location.lat}&types=poi&limit=10&access_token=${mapboxgl.accessToken}`;
		console.log('Fetching hospitals from:', url);

		try {
			const response = await fetch(url);
			const data = await response.json();

			console.log('🏥 Hospital data received:', data.features);

			const results: Hospital[] = data.features.map((place: any) => ({
				name: place.text,
				type: 'Hospital',
				location: place.place_name,
				distance: '',
				phone: '',
				rating: 0,
				open: true,
				hours: 'Unknown',
			}));

			// Add red markers
			data.features.forEach((place: any) => {
				new mapboxgl.Marker({ color: 'red' })
					.setLngLat(place.geometry.coordinates)
					.setPopup(new mapboxgl.Popup().setText(place.text))
					.addTo(mapInstance);
			});

			setHospitals(results);
		} catch (error) {
			console.error('Failed to fetch hospitals:', error);
		}
	};

	// UI
	return (
		<section id="find-hospital">
			<Container className="py-5 md:py-10">
				<Title
					title="Interactive Hospital Map"
					description="Locate nearby hospitals with our interactive map powered by Mapbox. Get real-time directions and essential information."
				/>
				<div className="w-full flex gap-5 my-8">
					<div className="w-3/4 border border-green rounded-2xl">
						<div
							ref={mapContainerRef}
							className="w-full h-[600px] rounded-2xl"
						/>
					</div>
					<div className="w-1/4 flex flex-col gap-1">
						<h5 className="mb-2 font-semibold text-lg">Nearby Hospitals</h5>
						<div className="flex flex-col gap-1 max-h-[600px] overflow-y-auto pr-1">
							{hospitals.map((hospital, idx) => (
								<HospitalCard
									key={idx}
									hospital={hospital}
								/>
							))}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Maps;
