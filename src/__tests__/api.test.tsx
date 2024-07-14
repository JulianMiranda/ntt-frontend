import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../api/api';

describe('API Configuration', () => {
	let mock: MockAdapter;

	beforeEach(() => {
		mock = new MockAdapter(api);
	});

	afterEach(() => {
		mock.reset();
	});

	test('should set the base URL correctly', () => {
		expect(api.defaults.baseURL).toBe('http://localhost:3002/bp');
	});

	test('should set Content-Type header to application/json', async () => {
		mock.onGet('/test').reply(200);

		await api.get('/test');

		expect(mock.history.get[0]?.headers?.['Content-Type']).toBe(
			'application/json'
		);
	});

	test('should handle request errors', async () => {
		mock.onGet('/error').reply(500);

		try {
			await api.get('/error');
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// eslint-disable-next-line jest/no-conditional-expect
				expect(error.response.status).toBe(500);
			} else {
				throw error;
			}
		}
	});
});
