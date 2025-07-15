'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Maps from './components/Maps';
import Feature from './components/Feature';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
	const [overrideLocation, setOverrideLocation] = useState<{
		lat: number;
		lng: number;
	} | null>(null);
	return (
		<div>
			<Navbar />
			<Hero onLocationSelect={setOverrideLocation} />
			<Maps overrideLocation={overrideLocation} />
			<Feature />
			<Contact />
			<Footer />
		</div>
	);
}
