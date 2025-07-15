'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
	GoogleMap,
	Marker,
	InfoWindow,
	useJsApiLoader,
} from '@react-google-maps/api';
import Container from './common/Container';
import Title from './common/Title';
import { HospitalCard } from './HospitalCard';
import { useUserLocation } from '../hooks/useUserLocation';
import { useHospitalData } from '../hooks/useHospitalData';

const containerStyle = {
	width: '100%',
	height: '600px',
};

type MapsProps = {
	overrideLocation?: { lat: number; lng: number } | null;
};

const Maps: React.FC<MapsProps> = ({ overrideLocation }) => {
	const location = useUserLocation(overrideLocation);
	const hospitals = useHospitalData(location);

	const { isLoaded, loadError } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});

	const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
	const mapRef = useRef<google.maps.Map | null>(null);
	const [zoom, setZoom] = useState(13);

	const onMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
		setZoom(map.getZoom() ?? 13);
	}, []);

	const onZoomChanged = () => {
		if (mapRef.current) {
			setZoom(mapRef.current.getZoom() ?? 13);
		}
	};

	if (loadError) return <p>Error loading maps</p>;
	if (!isLoaded || !location) return <p>Loading map...</p>;

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
							center={location}
							zoom={zoom}
							onLoad={onMapLoad}
							onZoomChanged={onZoomChanged}
						>
							{/* Green marker for user's location */}
							<Marker
								position={location}
								label="You"
								icon={{
									url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
								}}
								zIndex={999}
							/>

							{/* Hospital markers */}
							{hospitals.map((hospital, i) => (
								<Marker
									key={i}
									position={{ lat: hospital.lat, lng: hospital.lng }}
									onClick={() => setSelectedHospital(i)}
								/>
							))}

							{/* Show InfoWindow when a hospital is selected */}
							{selectedHospital !== null && hospitals[selectedHospital] && (
								<InfoWindow
									position={{
										lat: hospitals[selectedHospital].lat,
										lng: hospitals[selectedHospital].lng,
									}}
									onCloseClick={() => setSelectedHospital(null)}
								>
									<div className="text-sm font-medium">
										{hospitals[selectedHospital].name}
									</div>
								</InfoWindow>
							)}
						</GoogleMap>
					</div>

					{/* Hospital list */}
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
