'use client';

import React, { useEffect, useState } from 'react';
import Title from './common/Title';
import Card from './common/Card';
import Container from './common/Container';
import { FiPhone } from 'react-icons/fi';

const Contact = () => {
	const [dispatchNumber, setDispatchNumber] = useState<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem('emergencyNumber');
		if (stored) setDispatchNumber(stored);
	}, []);

	if (!dispatchNumber) return null;

	return (
		<section id="contact">
			<Container className="py-5 md:py-10">
				<Title
					title="In Case of Emergency Call"
					description="
				"
				/>
				<div className="flex justify-center mt-2">
					<Card
						className="items-center text-center max-w-md w-full"
						title="Emergency Dispatch"
						description={
							<>
								<span className="block text-2xl font-bold text-green mb-2">
									{dispatchNumber}
								</span>
								<span className="block mb-4 text-gray-500">
									For medical, fire, and police emergencies.
								</span>
								<a
									href={`tel:${dispatchNumber.replace(/\D/g, '')}`} // Strip non-numeric
									className="inline-flex justify-center items-center gap-2 bg-green hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
								>
									<FiPhone className="text-lg" /> Call Now
								</a>
							</>
						}
					/>
				</div>
			</Container>
		</section>
	);
};

export default Contact;
