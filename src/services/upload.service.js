import axios from 'axios';

class UploadService {
	constructor() {
		this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/upload` });

		this.app.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem('authToken');

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}

			return config;
		});
	}

	uploadImage(imageForm) {
		return this.app.post('/image', imageForm); // here I will receive the Cloudinary image URL sring
	}
}

const uploadService = new UploadService();

export default uploadService;
