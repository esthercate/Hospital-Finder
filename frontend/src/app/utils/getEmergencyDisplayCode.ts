// utils/getEmergencyDisplayCode.ts

interface EmergencyService {
	all: string[];
	gsm: string[] | null;
	fixed: string[] | null;
}

interface EmergencyData {
	country: { name: string; ISOCode: string };
	dispatch: EmergencyService;
	ambulance: EmergencyService;
	fire: EmergencyService;
	police: EmergencyService;
	localOnly: boolean;
	member_112: boolean;
	nodata: boolean;
}

export function getEmergencyDisplayCode(data: EmergencyData): string {
	const { country, dispatch, ambulance, fire, police } = data;

	const isValid = (s?: EmergencyService) =>
		s?.all?.some((num) => num && num.trim() !== '');

	// Use dispatch if others are empty
	if (
		!isValid(ambulance) &&
		!isValid(fire) &&
		!isValid(police) &&
		isValid(dispatch)
	) {
		return `${country.ISOCode} - ${dispatch.all[0]}`;
	}

	return `Emergency info not available for ${country.ISOCode}`;
}
