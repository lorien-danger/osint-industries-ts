import 'cross-fetch/polyfill';
import type { Module, SpecFormat, PlatformVariable } from './types/raw';
// import fetch from 'cross-fetch';

interface ClientOptions {
    apiKey: string;
}

interface SearchQuery {
    type: 'email' | 'phone';
    query: string;
    timeout?: number;
}

interface Client {
    search(query: SearchQuery): Promise<Module[]>;
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

    public async search(query: SearchQuery): Promise<Module[]> {
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
                return data as Module[];
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
}

export type { Module, SpecFormat, PlatformVariable };
