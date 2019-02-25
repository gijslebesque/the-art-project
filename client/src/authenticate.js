import axios from 'axios';
require('dotenv').config();

//const localIpHome = 'http://192.168.2.96:3001/api';
//const localIpWork = 'http://10.85.5.196:3001/api';
const localHost = 'http://localhost:3001/api';

class AuthService {
	constructor() {
		this.service = axios.create({
			baseURL: process.env.ENV === 'production' ? '/api' : localHost, withCredentials: true
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

	upload = (file, fileDescription, token) => {
		const formData = new FormData();
		formData.append("picture", file);
		for ( var key in fileDescription ) {
			formData.append(key, fileDescription[key]);
		}

		return this.service
			.post('/photo-upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					"Authorization" : `Bearer ${token}`
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

		findPersonalArtWorks = token => {
			return this.service.get('/findPersonalArtworks', { headers: {"Authorization" : `Bearer ${token}`}})
				.then(res => res.data)
				.catch(this.errHandler);	
		}

		findSpecificArtwork = id => {
			return this.service.get(`/findSpecificArtwork?id=${id}`)
				.then(res => res.data)
				.catch(this.errHandler);	
		}

		findArtworkByName = artworkName => {
			return this.service.get(`/findArtworkByName?artworkName=${artworkName}`)
			.then(res => res.data)
			.catch(this.errHandler);	
		}

		findArtistByName = artistName => {
			return this.service.get(`/findArtistByName?username=${artistName}`)
			.then(res => res.data)
			.catch(this.errHandler);	
		}

		findArtist = id => {
			return this.service.get(`/findArtist?id=${id}`).then(res => res.data)
			.catch(this.errHandler);
		}

		makeBid = (token, data) => {
			return this.service.put(`/makeBid`, {data:data}, { headers: {"Authorization" : `Bearer ${token}`}}).then(res => res.data)
			.catch(this.errHandler);
		}

		favourite = (token, data) => {
			return this.service.put(`/favourite`, {data:data}, { headers: {"Authorization" : `Bearer ${token}`}}).then(res => res.data)
			.catch(this.errHandler);
		}

		follow = (token, data) => {
			return this.service.put(`/follow`, {data:data}, { headers: {"Authorization" : `Bearer ${token}`}}).then(res => res.data)
			.catch(this.errHandler);
		}

		getUserInfo = token => {
			return this.service.get('/getUserInfo', { headers: {"Authorization" : `Bearer ${token}`}})
			.then(res => res.data)
			.catch(this.errHandler);	
		}
}

export default AuthService;