import type { PlatformVariable } from './platformVariable';

export interface SpecFormat {
	registered?: {
		proper_key: string;
		value: boolean;
		type: 'bool';
	};
	id?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	name?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	first_name?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	last_name?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	picture_url?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	profile_url?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	banner_url?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	username?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	gender?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	language?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	location?: {
		proper_key: string;
		value: string;
		type: 'str';
	};
	last_seen?: {
		proper_key: string;
		value: string;
		type: 'datetime';
	};
	creation_date?: {
		proper_key: string;
		value: string;
		type: 'datetime';
	};
	followers?: {
		proper_key: string;
		value: number;
		type: 'int';
	};
	following?: {
		proper_key: string;
		value: number;
		type: 'int';
	};
	premium?: {
		proper_key: string;
		value: boolean;
		type: 'bool';
	};
	platform_variables?: PlatformVariable[];
}
