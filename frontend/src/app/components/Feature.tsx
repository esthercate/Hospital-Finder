import React from 'react';
import Container from './common/Container';
import Title from './common/Title';
import Card from './common/Card';
import {
	FiNavigation,
	FiMapPin,
	FiClock,
	FiPhoneCall,
	FiStar,
	FiHeart,
} from 'react-icons/fi';

const features = [
	{
		icon: <FiMapPin className="text-green-500 text-3xl" />,
		iconBg: 'bg-green-100',
		title: 'GPS Location Services',
		description:
			'Automatically detect your location or manually enter your address to find the closest medical facilities.',
	},
	{
		icon: <FiNavigation className="text-blue-500 text-3xl" />,
		iconBg: 'bg-blue-100',
		title: 'Turn-by-Turn Directions',
		description:
			'Get precise driving directions with real-time traffic updates to reach hospitals as quickly as possible.',
	},
	{
		icon: <FiClock className="text-yellow-500 text-3xl" />,
		iconBg: 'bg-yellow-100',
		title: '24/7 Availability',
		description:
			'Access hospital information and directions any time, day or night.',
	},
	{
		icon: <FiPhoneCall className="text-red-500 text-3xl" />,
		iconBg: 'bg-red-100',
		title: 'Emergency Contacts',
		description:
			'Quickly call emergency services or hospital hotlines with one tap.',
	},
	{
		icon: <FiStar className="text-purple-500 text-3xl" />,
		iconBg: 'bg-purple-100',
		title: 'Top Rated Hospitals',
		description:
			'See ratings and reviews to choose the best hospital for your needs.',
	},
	{
		icon: <FiHeart className="text-pink-500 text-3xl" />,
		iconBg: 'bg-pink-100',
		title: 'Specialty Care',
		description:
			'Find hospitals and clinics that offer specialized medical services.',
	},
];

const Feature = () => {
	return (
		<section id="features">
			<Container className="py-5">
				<Title
					title="Features"
					description="This platform combines cutting-edge technology with essential medical information to help you find the right care when you need it most."
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
					{features.map((feature, idx) => (
						<Card
							key={idx}
							icon={feature.icon}
							iconBg={feature.iconBg}
							title={feature.title}
							description={feature.description}
							className="items-center text-center"
						/>
					))}
				</div>
			</Container>
		</section>
	);
};

export default Feature;
