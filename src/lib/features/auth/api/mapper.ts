import type { AuthProfile } from '../model/types';
import type { ProfileResponse } from './types';

export function mapMeResponse(raw: ProfileResponse): AuthProfile {
	return {
		id: raw.id,
		name: raw.name,
		username: raw.username,
		userType: raw.user_type
	};
}
