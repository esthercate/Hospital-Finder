import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxMap = () => {
	return (
		<Map
			mapboxAccessToken={MAPBOX_TOKEN}
			initialViewState={{
				longitude: -100,
				latitude: 40,
				zoom: 3.5,
			}}
			style={{ width: '100%', height: 400 }}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		/>
	);
};

export default MapboxMap;
