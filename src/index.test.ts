import { OsintClient } from './index';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

describe('OsintClient', () => {
	let client: OsintClient;

	beforeEach(() => {
		fetchMock.resetMocks();
		client = new OsintClient({ apiKey: 'test-api-key' });
	});

	test('search method should return expected data', async () => {
		fetchMock.mockResponseOnce(JSON.stringify([
			{
				"module": "google",
				"spec_format": [
					{
						"registered": {
							"proper_key": "Registered",
							"value": true,
							"type": "bool"
						},
						"id": {
							"proper_key": "Id",
							"value": "12312939591991",
							"type": "str"
						},
						"name": {
							"proper_key": "Name",
							"value": "Test McTesterson",
							"type": "str"
						},
						"first_name": {
							"proper_key": "First Name",
							"value": "Test",
							"type": "str"
						},
						"last_name": {
							"proper_key": "Last Name",
							"value": "McTesterson",
							"type": "str"
						},
						"last_seen": {
							"proper_key": "Last Seen",
							"value": "2021-03-20T15:16:51",
							"type": "datetime"
						},
						"platform_variables": [
							{
								"key": "google_services",
								"proper_key": "Google Services",
								"value": [],
								"type": "list"
							},
							{
								"key": "is_enterprise",
								"proper_key": "Is Enterprise",
								"value": false,
								"type": "bool"
							}
						]
					}
				],
				"status": "found",
				"query": "test@example.com",
				"from": "User supplied email.",
				"reliable_source": true
			},
			{
				"module": "youtube",
				"spec_format": [
					{
						"registered": {
							"proper_key": "Registered",
							"value": true,
							"type": "bool"
						},
						"id": {
							"proper_key": "Id",
							"value": "jasjdkK129KAkwlqla",
							"type": "str"
						},
						"name": {
							"proper_key": "Name",
							"value": "Test McTesterson",
							"type": "str"
						},
						"profile_url": {
							"proper_key": "Profile Url",
							"value": "https://www.youtube.com/channel/jasjdkK129KAkwlqla",
							"type": "str"
						},
						"creation_date": {
							"proper_key": "Creation Date",
							"value": "2021-01-01T00:00:00",
							"type": "datetime"
						},
						"platform_variables": [
							{
								"key": "subscriber_count",
								"proper_key": "Subscriber Count",
								"value": "No ",
								"type": "str"
							}
						]
					}
				],
				"status": "found",
				"query": "test@example.com",
				"from": "User supplied email.",
				"reliable_source": true
			},
		]));

		const modules = await client.search({ type: 'email', query: 'test@example.com' });
		expect(modules.length).toBe(2);
		expect(modules[0].module).toBe('google');
	});

	test('credits method should return expected data', async () => {
		fetchMock.mockResponseOnce('100');
		const credits = await client.credits();
		expect(credits).toBe(100);
	});
});
