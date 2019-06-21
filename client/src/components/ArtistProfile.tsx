import React, { Component } from "react";
import AuthService from "../authenticate.js";
import Loader from "react-loader-spinner";
import loaderStyles from "../styles/spinner.module.scss";
import artworkStyles from "../styles/artworks.module.scss";
import CardConstructor from "./CardConstructor";
import Grapqhl from "../graphqlQueries";

const GET_COMPLETEUSER = (id: String) => `{
    user(_id:"${id}"){
		username
        artworks {
            _id
            artworkURL
            artworkName
            artworkDescription
            auction {
                originalPrice
                bid
                endDate
                bidder {
                    username
                }
            }
        }
    }
}`;

interface IProps {
	location: any;
}

interface IState {
	artist: any;
	loading: boolean;
}

export default class ArtistProfile extends Component<IProps, IState> {
	service: any;
	search: any;
	constructor(props: any) {
		super(props);
		this.state = {
			artist: null,
			loading: true
		};
		this.service = new AuthService();
		this.search = new Grapqhl();
	}

	componentDidMount() {
		let params = new URLSearchParams(this.props.location.search);
		let artistId = params.get("id");
		this.findArtist(artistId);
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.location.search != this.props.location.search) {
			let params = new URLSearchParams(this.props.location.search);
			let artistId = params.get("id");
			this.findArtist(artistId);
		}
	}

	findArtist = (id: any) => {
		this.search
			.query(GET_COMPLETEUSER(id))
			.then((res: any) => {
				const { user } = res;
				this.setState({
					artist: user,
					loading: false
				});
			})
			.catch((err: any) => {
				console.log("err", err);
			});
	};

	artist = () => {
		if (!this.state.artist) return null;
		let artist = this.state.artist;
		let artworks = null;
		if (artist.artworks) {
			artworks = artist.artworks.map((artwork: any, i: number) => {
				return (
					<CardConstructor key={i} artwork={artwork} author={artist.username} />
				);
			});
		}

		return (
			<>
				<h1>{artist.username}</h1>
				<div className={artworkStyles.artworks}>{artworks}</div>
			</>
		);
	};
	render() {
		let artist = this.artist();
		return (
			<div className="artistProfile">
				<div className={loaderStyles.spinnerCenter}>
					{this.state.loading && (
						<Loader type="Triangle" color="#b0e0e6" height="50" width="50" />
					)}
				</div>
				{artist}
			</div>
		);
	}
}
