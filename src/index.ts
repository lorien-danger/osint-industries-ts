import type { Module as RawModule } from './types/raw';
import type { Module as ParsedModule, ModuleData } from './types/parsed';
import fetch from 'cross-fetch';

interface ClientOptions {
	apiKey: string;
}

interface SearchQuery {
	type: 'email' | 'phone';
	query: string;
	timeout?: number;
}

interface Client {
	search(query: SearchQuery): Promise<ParsedModule[]>;
	credits(): Promise<number>;
}

export class OsintClient implements Client {
	private BASE_URL = 'https://osint.industries/api';
	private _apiKey: string;

	constructor(options: ClientOptions) {
		if (!options.apiKey) {
			throw new Error('API key is required');
		}

		this._apiKey = options.apiKey;
	}

	private getHeaders(): Record<string, string> {
		return {
			'api-key': this._apiKey,
		};
	}

	public async search(query: SearchQuery): Promise<ParsedModule[]> {
		if (!query.query || !query.type) {
			throw new Error('Query and type fields are required');
		}

		if (query.timeout && (query.timeout < 1 || query.timeout > 60)) {
			throw new Error('Timeout must be between 1 and 60 seconds');
		}

		let url = `${this.BASE_URL}/v2/${query.type}/${query.query}`;
		url += query.timeout ? `?timeout=${query.timeout}` : '';

		const response = await fetch(url, { headers: this.getHeaders() });

		switch (response.status) {
			case 200: {
				const data = await response.json();
				return this.parseModules(data as RawModule[]);
			}
			case 400: {
				throw new Error('Invalid query or API key');
			}
			case 401: {
				throw new Error('Invalid API key or insufficient credits');
			}
			case 429: {
				throw new Error('Rate limit exceeded');
			}
			case 500: {
				throw new Error('API error');
			}
			default: {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}
		}
	}

	public async credits(): Promise<number> {
		const url = `${this.BASE_URL}/credits`;
		const response = await fetch(url, { headers: this.getHeaders() });

		switch (response.status) {
			case 200: {
				const data = await response.json();
				return data as number;
			}
			case 401: {
				throw new Error('Invalid API key or insufficient credits');
			}
			default: {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}
		}
	}

	private parseModules(rawModules: RawModule[]): ParsedModule[] {
		return rawModules.map((rawModule) => {
			const parsedModule: ParsedModule = {
				name: rawModule.module,
				data: {},
				verified: rawModule.reliableSource,
			};

			const specFormat = rawModule.spec_format[0];

			if (specFormat.registered !== undefined) {
				parsedModule.data.registered = specFormat.registered.value;
			}
			if (specFormat.id !== undefined) {
				parsedModule.data.id = specFormat.id.value;
			}
			if (specFormat.name !== undefined) {
				parsedModule.data.name = specFormat.name.value;
			}
			if (specFormat.first_name !== undefined) {
				parsedModule.data.firstName = specFormat.first_name.value;
			}
			if (specFormat.last_name !== undefined) {
				parsedModule.data.lastName = specFormat.last_name.value;
			}
			if (specFormat.picture_url !== undefined) {
				parsedModule.data.pictureUrl = specFormat.picture_url.value;
			}
			if (specFormat.profile_url !== undefined) {
				parsedModule.data.profileUrl = specFormat.profile_url.value;
			}
			if (specFormat.banner_url !== undefined) {
				parsedModule.data.bannerUrl = specFormat.banner_url.value;
			}
			if (specFormat.username !== undefined) {
				parsedModule.data.username = specFormat.username.value;
			}
			if (specFormat.gender !== undefined) {
				parsedModule.data.gender = specFormat.gender.value;
			}
			if (specFormat.language !== undefined) {
				parsedModule.data.language = specFormat.language.value;
			}
			if (specFormat.location !== undefined) {
				parsedModule.data.location = specFormat.location.value;
			}
			if (specFormat.last_seen !== undefined) {
				parsedModule.data.lastSeen = specFormat.last_seen.value;
			}
			if (specFormat.creation_date !== undefined) {
				parsedModule.data.creationDate = specFormat.creation_date.value;
			}
			if (specFormat.followers !== undefined) {
				parsedModule.data.followers = specFormat.followers.value;
			}
			if (specFormat.following !== undefined) {
				parsedModule.data.following = specFormat.following.value;
			}
			if (specFormat.premium !== undefined) {
				parsedModule.data.premium = specFormat.premium.value;
			}
			if (specFormat.platform_variables !== undefined) {
				parsedModule.data.platformVariables = specFormat.platform_variables.map((platformVariable) => ({
					[platformVariable.key]: platformVariable.value as string,
				}));
			}

			return parsedModule;
		});
	}
}

export type { ParsedModule as Module, ModuleData };
