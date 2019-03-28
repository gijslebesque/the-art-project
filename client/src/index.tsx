require("dotenv").config();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import WebFont from "webfontloader";
import history from "./history";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
	uri: process.env.URI
});
const client = new ApolloClient({
	cache,
	link
});

import "./styles/App.scss";

WebFont.load({
	google: {
		families: ["Titillium Web:300,400,700", "sans-serif"]
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<Router history={history}>
			<App />
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
