import axios from "axios";
require("dotenv").config();

//const localIpHome = 'http://192.168.2.96:3001/api';
//const localIpWork = 'http://10.85.5.196:3001/api';
const localHost = "http://localhost:3001/graphql";

const GET_ARTWORKS = name => ` { 
	artworkByName(artworkName:"${name}") { 
		artworkName
		author {
			username
		}
		}
	}`;

class SearchService {
	constructor() {
		this.service = axios.create({
			baseURL: process.env.ENV === "production" ? "/graphql" : localHost,
			withCredentials: true
		});

		// debugger;
	}
	errHandler = err => {
		if (err.response && err.response.data) {
			throw err.response.data.message;
		}
		throw err;
	};

	findRecentArtWorks = () => {
		return this.service
			.get("/findRecentArtworks")
			.then(res => res.data)
			.catch(this.errHandler);
	};

	findPersonalArtWorks = token => {
		return this.service
			.get("/findPersonalArtworks", {
				headers: { Authorization: `Bearer ${token}` }
			})
			.then(res => res.data)
			.catch(this.errHandler);
	};

	findSpecificArtwork = id => {
		return this.service
			.get(`/findSpecificArtwork?id=${id}`)
			.then(res => res.data)
			.catch(this.errHandler);
	};

	findArtworkByName = artworkName => {
		const query = artworkName ? artworkName : "";
		return this.service
			.post("", {
				query: GET_ARTWORKS(query)
			})
			.then(res => {
				return res.data.data.artworkByName;
			})
			.catch(this.errHandler);
	};

	findArtistByName = artistName => {
		return this.service
			.get(`/findArtistByName?username=${artistName}`)
			.then(res => res.data)
			.catch(this.errHandler);
	};

	findArtist = id => {
		return this.service
			.get(`/findArtist?id=${id}`)
			.then(res => res.data)
			.catch(this.errHandler);
	};
}

export default SearchService;
