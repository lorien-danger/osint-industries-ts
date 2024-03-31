import { OsintClient } from './index';
import { enableFetchMocks } from 'jest-fetch-mock';
import mockData from '../test_data/email-query.json';

enableFetchMocks();

describe('OsintClient', () => {
	let client: OsintClient;

	beforeEach(() => {
		fetchMock.resetMocks();
		client = new OsintClient({ apiKey: 'test-api-key' });
	});

	test('search method should return expected data', async () => {
		fetchMock.mockResponseOnce(JSON.stringify(mockData));
		const modules = await client.search({ type: 'email', query: 'test@example.com' });
		expect(modules).toEqual(mockData);
		expect(modules.length).toBe(15);
		expect(modules[0].module).toBe('google');
	});

	test('credits method should return expected data', async () => {
		fetchMock.mockResponseOnce('100');
		const credits = await client.credits();
		expect(credits).toBe(100);
	});
});
