# OSINT Industries API Client

This is a TypeScript client library for the OSINT Industries API. It provides a simple interface to search for information associated with email addresses or phone numbers and retrieve the remaining credits on your API account.

## Installation

Install the package using npm:

```bash
npm install osint-industries-ts
```

## Usage

First, import the `OsintClient` class and create a new instance with your API key:

```typescript
import { OsintClient } from 'osint-industries-ts';

const client = new OsintClient({ apiKey: 'YOUR_API_KEY' });
```

### Searching for Information

To search for information associated with an email address or phone number, use the `search` method. Each successful search will consume one credit from your account:

```typescript
const query = {
	type: 'email',
	query: 'example@example.com',
	timeout: 30,
};

try {
	const results = await client.search(query);
	console.log(results);
} catch (error) {
	console.error('Error:', error.message);
}
```

The `search` method takes an object with the following properties:

- `type`: The type of search to perform (`email` or `phone`).
- `query`: The email address or phone number to search for.
- `timeout` (optional): The maximum time to let the scrapers run for, in seconds (default: 60). The search will always return any results found before the timeout is reached.

> Note: We recommend setting a timeout of at least 30 seconds to allow the scrapers enough time to gather results.

The method returns a promise that resolves to an array of `Module` objects containing the search results.

### Checking Remaining Credits

To check the remaining credits on your API account, use the `credits` method:

```typescript
const remainingCredits = await client.credits();
console.log('Remaining credits:', remainingCredits);
```

The `credits` method returns a promise that resolves to the number of remaining credits on your account.

## Error Handling

The client library throws an error in the following cases:

- The API key is missing or invalid.
- The search query or type is missing.
- The timeout value is outside the allowed range (1-60 seconds).
- The API returns an error status code (400, 401, 429, 500).

Catch the errors and handle them appropriately in your application.

## Types

The library exports the following TypeScript types:

- `Module`: Represents a search result module, which contains a `spec_format` field.
- `SpecFormat`: Represents the standardised data for a search result.
- `PlatformVariable`: Represents a platform-specific variable for a search result.

## License

This library is released under the MIT License.
