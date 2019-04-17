import React, { Component } from "react";
import styles from "../styles/navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchResults from "./SearchResults";
import AuthService from "../authenticate";
import axios from "axios";

import Search from "../graphqlQueries";

interface IProps {
	toggleSideNav: any;
}

interface IState {
	showSearchContainer: boolean;
	searchResults: any;
	query: any;
	queryType: string;
}

export default class Navbar extends Component<IProps, IState> {
	service: any;
	nameInput: any;
	search: any;
	constructor(props: any) {
		super(props);
		this.state = {
			showSearchContainer: false,
			searchResults: null,
			query: "",
			queryType: "artist"
		};

		this.service = new AuthService();
		this.search = new Search();
		this.nameInput = React.createRef();
	}

	componentDidMount() {
		// axios("http://localhost:3001/graphql", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json"
		// 	},
		// 	data: artworkQuery
		// })
		// 	.then(data => console.log("data returned:", data.data.data))
		// 	.catch(err => console.log(err));
	}

	findParent = (node: any) => {
		var nodes = [];
		nodes.push(node);
		if (node.className.includes("searchResultsContainer")) {
			return true;
		}
		while (node.parentNode) {
			if (
				node.parentNode.className &&
				node.parentNode.className.includes("searchResultsContainer")
			) {
				return true;
			}
			nodes.unshift(node.parentNode.className);
			node = node.parentNode;
		}
		return false;
	};

	searchArwork = (e: any) => {
		e.preventDefault();
		const { value } = e.target;
		this.setState({ query: value });

		console.log("Hi", this.state.queryType);

		if (this.state.queryType === "artwork") {
			this.search
				.findArtworkByName(e.target.value)
				.then((res: any) => {
					debugger;
					this.setState({ searchResults: res });
				})
				.catch((err: any) => console.log("Hi", err));
		} else {
			this.search
				.findUserByName(e.target.value)
				.then((res: any) => {
					debugger;
					this.setState({ searchResults: res });
				})
				.catch((err: any) => console.log("Hi", err));
		}
	};

	eventListener = (e: any) => {
		e.preventDefault();
		if (this.state.showSearchContainer && !this.findParent(e.target)) {
			this.setState({ showSearchContainer: false });
		}
		window.removeEventListener("click", this.eventListener);
	};

	showSearchResultContainer = (e: any, toggle: boolean) => {
		e.stopPropagation();
		this.setState({ showSearchContainer: toggle });
		window.addEventListener("click", this.eventListener);
	};

	querySelect = (e: any, queryType: string) => {
		this.setState({ queryType: queryType, searchResults: "" });
		this.nameInput.current.focus();
		let buttons = e.target.parentNode.children;
		for (let i = 0; i < buttons.length; i++) {
			console.log(buttons[i].className);
			if (buttons[i].className === styles.active) {
				buttons[i].className = "";
			}
		}
		e.target.className === styles.active
			? (e.target.className = "")
			: (e.target.className = styles.active);
	};

	render() {
		return (
			<>
				<nav className={styles.nav}>
					<div
						className={styles.hamburger}
						onClick={() => this.props.toggleSideNav(true)}
					>
						<span />
						<span />
						<span />
					</div>

					<form
						onClick={(e: any) => this.showSearchResultContainer(e, true)}
						autoComplete="off"
					>
						<input
							ref={this.nameInput}
							type="text"
							placeholder="Search ..."
							name="query"
							onChange={(e: any) => {
								this.searchArwork(e);
							}}
						/>
					</form>
					<FontAwesomeIcon
						className={styles.logo}
						icon="gavel"
						size="1x"
						style={{ transform: "scaleX(-1)" }}
					/>
				</nav>
				{this.state.showSearchContainer && (
					<SearchResults
						searchResults={this.state.searchResults}
						showSearchResultContainer={this.showSearchResultContainer}
						querySelect={this.querySelect}
						queryType={this.state.queryType}
					/>
				)}
			</>
		);
	}
}
