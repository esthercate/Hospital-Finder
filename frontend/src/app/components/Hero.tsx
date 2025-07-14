import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

type HeroProps = {
	onLocationSelect: (coords: { lat: number; lng: number }) => void;
};

const Hero: React.FC<HeroProps> = ({ onLocationSelect }) => {
	const [query, setQuery] = useState('');

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!query) return;

		try {
			const res = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					query
				)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
			);
			const data = await res.json();

			const location = data?.results?.[0]?.geometry?.location;
			if (location) {
				onLocationSelect({ lat: location.lat, lng: location.lng });

				// Smooth scroll to the map
				setTimeout(() => {
					const mapSection = document.getElementById('find-hospital');
					if (mapSection) {
						mapSection.scrollIntoView({ behavior: 'smooth' });
					}
				}, 100); // slight delay to ensure Maps rerenders
			} else {
				alert('Location not found. Try a more specific name.');
			}
		} catch (err) {
			console.error('Error geocoding location:', err);
			alert('Error finding location.');
		}
	};

	return (
		<section
			className="relative w-full min-h-[60vh] flex items-center bg-cover bg-center"
			style={{ backgroundImage: "url('/bg8.jpg')" }}
		>
			<div className="absolute inset-0 bg-black/40 z-0" />
			<div className="relative z-10 w-full max-w-7xl mx-auto px-4">
				<div className="md:w-3/4 py-16 px-auto md:px-20">
					<h1 className="font-bold text-white drop-shadow-lg mb-2 text-left">
						Find the Nearest Hospital in Seconds
					</h1>
					<p className="mb-8 max-w-md text-white">
						Instantly locate the closest medical facilities, emergency rooms,
						and urgent care centers near you with real-time directions.
					</p>
					<form
						onSubmit={handleSearch}
						className="w-full max-w-md text-left"
					>
						<div className="flex items-center justify-between border-2 border-white bg-white rounded-lg shadow px-1 py-1">
							<div className="flex items-center">
								<FiSearch className="text-green text-xl mx-2" />
								<input
									type="search"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="bg-transparent outline-none border-none text-gray-600 placeholder-green"
									placeholder="Enter your location"
								/>
							</div>
							<button
								type="submit"
								className="ml-2 bg-green hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
							>
								Find Hospitals
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Hero;
