import axios from "axios";
require("dotenv").config();

//const localIpHome = 'http://192.168.2.96:3001/api';
//const localIpWork = 'http://10.85.5.196:3001/api';
const localHost = "http://localhost:3001/graphql";

//Graphql queries
const SEARCH_ARTWORKS_NAME = name => ` { 
	artworks(artworkName:"${name}") { 
		_id
		artworkName
		author {
			username
		}
	}
}`;

const GET_ARTWORK_ID = id => ` { 
	artworks(_id:"${id}") { 
		_id
		artworkURL
		artworkName
		artworkDescription
		favouritised {
    		username
    	}
		following {
			username
		}
		auction {
			originalPrice
			endDate
			bid
			bidder {
				_id
			}
		}  
	}
}`;

const SEARCH_USERS_NAME = name => ` { 
	users(username:"${name}") {
			_id 
			username
		}
	}`;

const GET_COMPLETEUSER = id => `{
		user(id:"${id}") {
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

	findSpecificArtwork = async id => {
		try {
			const result = await this.service.post("", {
				query: GET_ARTWORK_ID(id)
			});
			const { artwork } = result.data.data;
			return artwork;
		} catch {
			return this.errHandler;
		}
	};

	findArtworkByName = async artworkName => {
		try {
			const query = artworkName ? artworkName : "";
			const result = await this.service.post("", {
				query: SEARCH_ARTWORKS_NAME(query)
			});
			const { artworks } = result.data.data;
			return artworks;
		} catch {
			return this.errHandler;
		}
	};

	graphqlQuery = async query => {
		let result;
		debugger;
		try {
			return (result = await this.service.post("", query));
		} catch {
			return this.errHandler;
		}
	};

	findUserByName = async username => {
		try {
			const query = username ? username : "";
			const result = await this.service.post("", {
				query: SEARCH_USERS_NAME(query)
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
