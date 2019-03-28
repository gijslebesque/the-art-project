import React, { Component } from "react";
import styles from "../styles/artworks.module.scss";
import history from "../history";

interface IState {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	intervalId: any;
}

interface IProps {
	artwork: any;
}

export default class CardConstructor extends Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			intervalId: 0
		};
	}

	showFullArtwork = (artwork: any) => {
		history.push(`/artwork?id=${artwork._id}`);
	};

	render() {
		let artwork = this.props.artwork;

		return (
			<div
				className={styles.singleCard}
				onClick={() => {
					this.showFullArtwork(artwork);
				}}
			>
				<img src={artwork.artworkURL} />
				<h3>{artwork.author.username}</h3>
				<p>{artwork.artworkName}</p>
				<p>{artwork.description}</p>
				<p>$ {artwork.auction.originalPrice}</p>
			</div>
		);
	}
}
