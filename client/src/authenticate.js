import axios from 'axios';
require('dotenv').config();

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: process.env.ENV === 'production' ? '/api' : 'http://localhost:3001/api', withCredentials: true
		});
		
	}
	errHandler = err => {
		if (err.response && err.response.data) {
			throw err.response.data.message
		}
		throw err;
	}

	login = (username, password) => {
		return this.service.post('/login', {username, password})
			.then(res => res.data)
			.catch(this.errHandler);
	}

	logout = () => {
		return this.service.post('/logout')
			.then(res => res.data)
			.catch(this.errHandler);
	}

	register = (username, email, password) => {
		return this.service.post('/register', {username, email, password})
			.then(res => res.data)
			.catch(this.errHandler);
	}

	loggedin = () => {
		return this.service.get('/loggedin')
			.then(res => res.data)
			.catch(this.errHandler);
	}

	upload = (file, fileDescription) => {
		const formData = new FormData();
		formData.append("picture", file);
		for ( var key in fileDescription ) {
			formData.append(key, fileDescription[key]);
		}

		return this.service
			.post('/photo-upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
		  	})
			.then(res => res.data)
			.catch(this.errHandler);
		}
		
		findRecentArtWorks = () => {
			return this.service.get('/findRecentArtworks')
				.then(res => res.data)
				.catch(this.errHandler);	
		}
}



export default AuthService;