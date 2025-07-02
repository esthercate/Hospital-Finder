import React from 'react';
import Container from './common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';

const Navbar = () => {
	return (
		<nav className="w-full bg-white shadow-sm">
			<Container>
				<div className="flex items-center justify-between py-4 px-auto md:px-10">
					{/* Logo and Site Name */}
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
					{/* Nav Links */}
					<div className="flex items-center space-x-8">
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
						<button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition-colors ml-4">
							<FiPhone className="text-lg" />
							<span>Emergency: 999</span>
						</button>
					</div>
				</div>
			</Container>
		</nav>
	);
};

export default Navbar;
