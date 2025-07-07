import React from 'react';
import Container from './common/Container';
import Title from './common/Title';
import { HospitalCard, Hospital } from './HospitalCard';

const Maps = () => {
	const hospitalData: Hospital[] = [
		{
			name: 'City General Hospital',
			type: 'General Hospital',
			location: '123 Main St, Springfield',
			distance: '1.2 miles',
			phone: '(555) 123-4567',
			rating: 4.5,
			open: true,
			hours: 'Open 24 hours',
		},
		{
			name: 'Springfield Medical Center',
			type: 'Medical Center',
			location: '456 Elm St, Springfield',
			distance: '2.0 miles',
			phone: '(555) 987-6543',
			rating: 4.2,
			open: false,
			hours: 'Mon-Fri: 8am - 8pm',
		},
		{
			name: 'Urgent Care Plus',
			type: 'Urgent Care',
			location: '789 Oak St, Springfield',
			distance: '2.5 miles',
			phone: '(555) 555-1212',
			rating: 4.7,
			open: true,
			hours: 'Mon-Sun: 7am - 10pm',
		},
		{
			name: 'City General Hospital',
			type: 'General Hospital',
			location: '123 Main St, Springfield',
			distance: '1.2 miles',
			phone: '(555) 123-4567',
			rating: 4.5,
			open: true,
			hours: 'Open 24 hours',
		},
		{
			name: 'Springfield Medical Center',
			type: 'Medical Center',
			location: '456 Elm St, Springfield',
			distance: '2.0 miles',
			phone: '(555) 987-6543',
			rating: 4.2,
			open: false,
			hours: 'Mon-Fri: 8am - 8pm',
		},
		{
			name: 'Urgent Care Plus',
			type: 'Urgent Care',
			location: '789 Oak St, Springfield',
			distance: '2.5 miles',
			phone: '(555) 555-1212',
			rating: 4.7,
			open: true,
			hours: 'Mon-Sun: 7am - 10pm',
		},
	];

	return (
		<section id="find-hospital">
			<Container className="py-5 md:py-10">
				<Title
					title="Interactive Hospital Map"
					description="Locate nearby hospitals with our interactive map powered by Google Maps API. Get real-time directions and essential information."
				/>
				<div className="w-full flex gap-5 my-8">
					<div className="w-3/4 border border-green rounded-2xl"></div>
					<div className="w-1/4 flex flex-col gap-1">
						<h5 className="mb-2">Nearby Hospitals</h5>
						<div className="flex flex-col gap-1 max-h-[600px] overflow-y-auto pr-1">
							{hospitalData.map((hospital, idx) => (
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
