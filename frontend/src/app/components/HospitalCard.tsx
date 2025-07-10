'use client';
import React from 'react';
import { MdOutlineLocationOn, MdOutlineLocalPhone } from 'react-icons/md';
import { TbLocation } from 'react-icons/tb';
import { FaRegStar } from 'react-icons/fa6';

// Updated Hospital type
export interface Hospital {
	name: string;
	lat: number;
	lng: number;
	vicinity?: string;
	rating?: number;
	open?: boolean; // add this
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
	return (
		<div className="bg-white rounded-2xl shadow p-5 border border-gray-100 flex flex-col items-start max-w-sm w-full mb-2 transition-all duration-200 hover:shadow-lg">
			<div className="flex flex-col gap-2 w-full">
				<h6 className="font-semibold">{hospital.name}</h6>

				{hospital.vicinity && (
					<div className="text-xs text-gray-500 flex items-center gap-1">
						<MdOutlineLocationOn size={18} />
						{hospital.vicinity}
					</div>
				)}

				{hospital.open !== undefined && (
					<div className="text-xs text-gray-500 flex items-center gap-1">
						<span
							className={
								hospital.open
									? 'text-green font-semibold'
									: 'text-red-500 font-semibold'
							}
						>
							{hospital.open ? 'Open Now' : 'Closed'}
						</span>
					</div>
				)}
			</div>

			<div className="mt-3 flex justify-between items-center w-full">
				<div className="flex gap-1 items-center">
					{hospital.rating &&
						Array.from({ length: Math.floor(hospital.rating) }).map((_, i) => (
							<FaRegStar
								key={i}
								className="text-green"
								size={18}
							/>
						))}
					{hospital.rating && (
						<span className="text-xs ml-1">{hospital.rating}</span>
					)}
				</div>

				<button className="px-3 py-1 bg-green text-white rounded hover:bg-green-800 transition text-xs flex items-center gap-1">
					<TbLocation className="text-white" />
					Directions
				</button>
			</div>
		</div>
	);
}
