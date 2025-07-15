// /app/api/places/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');

	if (!lat || !lng) {
		return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
	}

	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
	const radius = 5000; // meters

	const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=hospital&key=${apiKey}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Google API Error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch places' },
			{ status: 500 }
		);
	}
}
