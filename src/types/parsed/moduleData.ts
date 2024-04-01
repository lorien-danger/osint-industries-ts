export interface ModuleData {
	registered?: boolean;
	id?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	pictureUrl?: string;
	profileUrl?: string;
	bannerUrl?: string;
	username?: string;
	gender?: string;
	language?: string;
	location?: string;
	lastSeen?: string;
	creationDate?: string;
	followers?: number;
	following?: number;
	premium?: boolean;
	platformVariables?: Record<string, string>[];
}
