import React from 'react';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const Container = ({ children, className = '' }: Props) => {
	return (
		<div className={`max-w-7xl mx-auto px-4 md:px-10 ${className}`}>
			{children}
		</div>
	);
};

export default Container;
