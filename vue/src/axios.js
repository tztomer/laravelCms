import axios from 'axios';
import { store } from './store/store.js';

const axiosClint = axios.create({
	baseURL: 'http://localhost:8000/api',
});

axiosClint.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `Bearer ${store.state.user.user.token}`;
		return config;
	},
);
export default axiosClint;
