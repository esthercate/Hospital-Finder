import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');

	if (!code) {
		return NextResponse.json(
			{ error: 'Missing country code' },
			{ status: 400 }
		);
	}

	try {
		const response = await fetch(
			`https://emergencynumberapi.com/api/country/${code}`
		);

		if (!response.ok) {
			const errorData = await response.text();
			return NextResponse.json(
				{ error: `Failed to fetch emergency data: ${errorData}` },
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Server error: ' + (error as Error).message },
			{ status: 500 }
		);
	}
}
