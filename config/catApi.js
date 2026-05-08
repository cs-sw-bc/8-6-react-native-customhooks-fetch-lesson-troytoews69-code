const rawKey = process.env.EXPO_PUBLIC_CAT_API_KEY ?? '';

export const CAT_API_KEY = rawKey.trim();
export const HAS_VALID_CAT_API_KEY =
	CAT_API_KEY.length > 0 &&
	CAT_API_KEY !== 'PASTE_YOUR_CAT_API_KEY_HERE' &&
	CAT_API_KEY !== 'PASTE_YOUR_NEW_CAT_API_KEY_HERE';
