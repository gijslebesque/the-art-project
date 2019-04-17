import axios from "axios";
require("dotenv").config();

//const localIpHome = 'http://192.168.2.96:3001/api';
//const localIpWork = 'http://10.85.5.196:3001/api';
const localHost = "http://localhost:3001/graphql";

//Graphql queries
const GET_ARTWORKSBYNAME = name => ` { 
	artworks(artworkName:"${name}") { 
		artworkName
		author {
			username
		}
	}
}`;

const GET_USERBYNAME = name => ` { 
	users(username:"${name}") { 
			username
		}
	}`;

class SearchService {
	constructor() {
		this.service = axios.create({
			baseURL: process.env.ENV === "production" ? "/graphql" : localHost,
			withCredentials: true
		});
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

	findArtworkByName = async artworkName => {
		try {
			const query = artworkName ? artworkName : "";
			const result = await this.service.post("", {
				query: GET_ARTWORKSBYNAME(query)
			});
			const { artworks } = result.data.data;
			debugger;

			return artworks;
		} catch {
			return this.errHandler;
		}
	};

	findUserByName = async username => {
		try {
			const query = username ? username : "";
			const result = await this.service.post("", {
				query: GET_USERBYNAME(query)
			});
			const { users } = result.data.data;
			return users;
		} catch {
			return this.errHandler;
		}
	};

	findArtist = id => {
		return this.service
			.get(`/findArtist?id=${id}`)
			.then(res => res.data)
			.catch(this.errHandler);
	};
}

export default SearchService;
