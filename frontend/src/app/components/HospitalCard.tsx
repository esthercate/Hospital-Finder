import { MdOutlineLocationOn, MdOutlineLocalPhone } from 'react-icons/md';
import { TbLocation } from 'react-icons/tb';
import { FaRegStar } from 'react-icons/fa6';
import React from 'react';

// Hospital type for props
export interface Hospital {
	name: string;
	type: string;
	location: string;
	distance: string;
	phone: string;
	rating: number;
	open: boolean;
	hours: string;
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
	return (
		<div className="bg-white rounded-2xl shadow p-5 border border-gray-100 flex flex-col items-start max-w-sm w-full mb-2 transition-all duration-200 hover:shadow-lg">
			<div className="flex flex-col gap-2 w-full">
				<h6 className="">{hospital.name}</h6>
				<div className="text-sm flex items-center">{hospital.type}</div>
				<div className="text-xs text-gray-500 flex items-center gap-1">
					<MdOutlineLocationOn size={20} />
					{hospital.location}
				</div>
				<div className="text-xs text-gray-500 flex items-center gap-1">
					<TbLocation size={20} />
					{hospital.distance} away
				</div>
				<div className="text-xs text-gray-500 flex items-center gap-1">
					<MdOutlineLocalPhone size={20} />
					{hospital.phone}
				</div>
				<div className="flex gap-2">
					<span
						className={`text-xs font-semibold ${
							hospital.open ? 'text-green' : 'text-red-500'
						}`}
					>
						{hospital.open ? 'Open Now' : 'Closed'}
					</span>
					<span className="text-xs text-gray-500">| {hospital.hours}</span>
				</div>
			</div>
			<div className="mt-3 flex justify-between items-center w-full">
				<div className="flex gap-1">
					{Array.from({ length: Math.floor(hospital.rating) }).map((_, i) => (
						<FaRegStar
							key={i}
							className="text-green"
							size={18}
						/>
					))}
					<span className="text-xs ml-1">{hospital.rating}</span>
				</div>
				<button className="px-3 py-1 bg-green text-white rounded hover:bg-green-800 transition text-xs flex items-center gap-1">
					<TbLocation className="text-white" /> Directions
				</button>
			</div>
		</div>
	);
}
