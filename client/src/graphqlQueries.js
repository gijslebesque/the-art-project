import axios from "axios";
require("dotenv").config();

//const localIpHome = 'http://192.168.2.96:3001/api';
//const localIpWork = 'http://10.85.5.196:3001/api';
const localHost = "http://localhost:3001/graphql";

//Graphql queries

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

	query = async query => {
		try {
			const result = await this.service.post("", { query: query });
			return result.data.data;
		} catch (err) {
			debugger;
			return this.errHandler(err);
		}
	};
	mutation = async (mutation, jsonWebToken) => {
		debugger;
		try {
			const result = await this.service.post("", {
				mutation: mutation,
				headers: {
					Authorization: `Bearer ${jsonWebToken}`
				}
			});
			return result.data.data;
		} catch (err) {
			debugger;
			return this.errHandler(err);
		}
	};
}

export default SearchService;
