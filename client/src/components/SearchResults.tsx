import React, { Component } from "react";
import Loader from "react-loader-spinner";
import styles from "../styles/navbar.module.scss";
import history from "../history";

interface IProps {
	searchResults: any;
	showSearchResultContainer: any;
	querySelect: any;
	queryType: any;
}

interface IState {
	loading: boolean;
}

export default class SearchResults extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			loading: false
		};
	}
	render() {
		//Think of better way, two db queries too much
		let results;
		if (this.props.queryType === "artwork" && this.props.searchResults) {
			results = this.props.searchResults.map((artwork: any, i: number) => {
				return (
					<p
						key={i}
						onClick={(e: any) => {
							history.push(`artwork?id=${artwork._id}`);
							this.props.showSearchResultContainer(e, false);
						}}
					>
						{artwork.artworkName} by {artwork.author.username}
					</p>
				);
			});
		} else if (this.props.queryType === "artist" && this.props.searchResults) {
			results = this.props.searchResults.map((artist: any, i: number) => {
				return (
					<p
						key={i}
						onClick={(e: any) => {
							history.push(`artist?id=${artist._id}`);
							this.props.showSearchResultContainer(e, false);
						}}
					>
						{artist.username}
					</p>
				);
			});
		}
		return (
			<div className={styles.searchResultsContainer}>
				{this.state.loading && <Loader />}

				<div className={styles.btnRow}>
					<button
						onClick={e => {
							this.props.querySelect(e, "artist");
						}}
						className={styles.active}
					>
						Artists
					</button>
					<button
						onClick={e => {
							this.props.querySelect(e, "artwork");
						}}
					>
						Artwork
					</button>
				</div>
				<div className={styles.searchResults}>{results}</div>
			</div>
		);
	}
}
