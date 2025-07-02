import React from 'react';
import Title from './common/Title';
import Card from './common/Card';
import Container from './common/Container';
import { FiPhone } from 'react-icons/fi';

const contacts: {
	title: string;
	number: string;
	description: string;
	color: 'red' | 'rose' | 'pink';
}[] = [
	{
		title: 'Emergency Contact',
		number: '911',
		description: 'Medical emergencies, ambulance services, Fire',
		color: 'red',
	},
	{
		title: 'Crisis Hotline',
		number: '1199',
		description:
			'Mental health support, suicide prevention, and crisis counseling',
		color: 'rose',
	},
	{
		title: 'Poison Control',
		number: '1198',
		description: 'Poisoning or need urgent advice about toxic substances.',
		color: 'pink',
	},
];

const colorMap = {
	red: {
		text: 'text-green',
		bg: 'bg-green',
		hover: 'hover:bg-green-800',
	},
	rose: {
		text: 'text-green',
		bg: 'bg-green',
		hover: 'hover:bg-green-800',
	},
	pink: {
		text: 'text-green',
		bg: 'bg-green',
		hover: 'hover:bg-green-800',
	},
};

const Contact = () => {
	return (
		<Container className="py-5 md:py-12">
			<Title
				title="Emergency Contact"
				description="This platform combines cutting-edge technology with essential medical information to help you find the right care when you need it most."
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
				{contacts.map((contact, idx) => {
					const color = colorMap[contact.color];
					return (
						<Card
							key={idx}
							className="items-center text-center"
							title={contact.title}
							description={
								<>
									<span
										className={`block text-2xl font-bold ${color.text} mb-2`}
									>
										{contact.number}
									</span>
									<span className="block mb-4 text-gray-500">
										{contact.description}
									</span>
									<a
										href={`tel:${contact.number}`}
										className={`inline-flex w-full justify-center items-center gap-2 ${color.bg} ${color.hover} text-white font-semibold px-5 py-2 rounded-lg transition-colors mt-2`}
									>
										<FiPhone className="text-lg" /> Call Now
									</a>
								</>
							}
						/>
					);
				})}
			</div>
		</Container>
	);
};

export default Contact;
