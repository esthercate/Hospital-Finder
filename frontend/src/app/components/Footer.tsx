import React from 'react';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="w-full py-6 bg-[#282e40] text-center text-white text-sm border-t">
			© {year} HospitalFinder. All rights reserved.
		</footer>
	);
};

export default Footer;
