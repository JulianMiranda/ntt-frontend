import axios from 'axios';

const baseURL = 'http://localhost:3002/bp';

const api = axios.create({baseURL});

api.interceptors.request.use(
	async (config) => {
		if (config.headers) {
			config.headers['Content-Type'] = 'application/json';
			config.headers['Authorization'] = 'Bearer YOUR_AUTH_TOKEN'; // Si necesitas un token de autenticación
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
