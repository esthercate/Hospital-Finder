'use client';
import React, { useEffect, useState } from 'react';
import Container from './common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
	const [emergency, setEmergency] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem('emergencyNumber');
		if (stored) {
			setEmergency(stored);
		}
	}, []);

	return (
		<nav className="w-full bg-white shadow-sm">
			<Container>
				<div className="flex items-center justify-between py-4 px-auto md:px-10">
					<div className="flex items-center space-x-3">
						<Image
							src="/Logo.jpg"
							alt="Hospital Finder Logo"
							width={30}
							height={30}
							className="rounded-full"
						/>
						<span className="text-xl font-bold text-green-600">
							Hospital Finder
						</span>
					</div>

					{/* Hamburger menu for mobile */}
					<div className="md:hidden">
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-green focus:outline-none"
						>
							{menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
						</button>
					</div>

					{/* Nav links */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							href="/"
							className="hover:text-green-600 font-semibold transition-colors"
						>
							Home
						</Link>
						<Link
							href="#find-hospital"
							className="hover:text-green-600 font-semibold transition-colors"
						>
							Find Hospital
						</Link>
						<Link
							href="#features"
							className="hover:text-green-600 font-semibold transition-colors"
						>
							Features
						</Link>
						<Link
							href="#contact"
							className="hover:text-green-600 font-semibold transition-colors"
						>
							Contact
						</Link>
						<button className="flex items-center gap-2 border border-green text-green hover:text-white hover:bg-green font-bold py-2 px-4 rounded-lg transition-colors ml-4">
							<FiPhone className="text-lg" />
							<span>Emergency: {emergency}</span>
						</button>
					</div>
				</div>

				{/* Mobile menu dropdown */}
				{menuOpen && (
					<div className="md:hidden bg-white shadow-lg rounded-b-lg px-6 py-4 flex flex-col space-y-4 animate-fade-in absolute left-0 right-0 top-[72px] z-50">
						<Link
							href="/"
							className="hover:text-green-600 font-semibold transition-colors"
							onClick={() => setMenuOpen(false)}
						>
							Home
						</Link>
						<Link
							href="#find-hospital"
							className="hover:text-green-600 font-semibold transition-colors"
							onClick={() => setMenuOpen(false)}
						>
							Find Hospital
						</Link>
						<Link
							href="#features"
							className="hover:text-green-600 font-semibold transition-colors"
							onClick={() => setMenuOpen(false)}
						>
							Features
						</Link>
						<Link
							href="#contact"
							className="hover:text-green-600 font-semibold transition-colors"
							onClick={() => setMenuOpen(false)}
						>
							Contact
						</Link>
						<button className="flex items-center gap-2 border border-green text-green hover:text-white hover:bg-green font-bold py-2 px-4 rounded-lg transition-colors">
							<FiPhone className="text-lg" />
							<span>Emergency: {emergency}</span>
						</button>
					</div>
				)}
			</Container>
		</nav>
	);
};

export default Navbar;
