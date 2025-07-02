import React from 'react';

type Props = {
	title: string;
	description: string;
};

const Title = ({ title, description }: Props) => {
	return (
		<div className="flex flex-col items-center justify-center text-center gap-3">
			<h2 className="text-green">{title}</h2>
			<p className="max-w-lg">{description}</p>
		</div>
	);
};

export default Title;
