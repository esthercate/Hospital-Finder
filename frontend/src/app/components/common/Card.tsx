import React from 'react';

interface CardProps {
	icon?: React.ReactNode;
	iconBg?: string;
	title?: string;
	description?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
}

const Card: React.FC<CardProps> = ({
	icon,
	iconBg = 'bg-blue-100',
	title,
	description,
	children,
	className = '',
}) => {
	return (
		<div
			className={`bg-white rounded-2xl shadow p-8 border border-gray-100 flex flex-col justify-center max-w-sm transition-all duration-200 hover:shadow-lg group ${className}`}
		>
			{icon && (
				<div
					className={`${iconBg} rounded-xl p-4 mb-6 flex justify-center transition-transform duration-200 group-hover:scale-110`}
				>
					{icon}
				</div>
			)}
			{title && (
				<h5 className="text-xl font-bold text-gray-900 mb-3">{title}</h5>
			)}
			{description && (
				<p className="text-gray-500 text-base w-full">{description}</p>
			)}
			{children}
		</div>
	);
};

export default Card;
