import React, {Component, ReactDOM} from 'react';
import styles from '../styles/navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchResults from './SearchResults';
import AuthService from '../authenticate';
import { resolve6 } from 'dns';

interface IProps {
	toggleSideNav:any;
}

interface IState {
	showSearchContainer:boolean;
	searchResults:any;
	query:any;
}


export default class Navbar extends Component <IProps, IState>{
	service:any;

	constructor(props:any) {
		super(props);
		this.state = {
			showSearchContainer:true,
			searchResults:null,
			query:""
		}
		this.service = new AuthService();
	}

	componentDidMount() {
		window.addEventListener('click', (e:any) => {
			e.preventDefault();
			if(this.state.showSearchContainer && !this.findParent(e.target)){
				this.setState({showSearchContainer:false});

			}
		});
	}

	findParent = (node:any) => {
		var nodes = [];
		nodes.push(node);
		if(node.className.includes("searchResultsContainer")){
			return true;
		}
		while(node.parentNode) {
			if(node.parentNode.className && node.parentNode.className.includes("searchResultsContainer")){
				return true;
			}
			nodes.unshift(node.parentNode.className);
			node = node.parentNode;
		}
		return false;
	}

	searchArwork = (e:any) => {

		const {value} = e.target;
		this.setState({query: value})
		this.service.findArtworkByName(e.target.value).then((res:any) => {
			console.log("rws", res)
			this.setState({searchResults:res});
		}).catch((err:any) => {
			//show err

		})
	}


	showSearchResultContainer = (e:any, toggle:boolean) =>{
		e.stopPropagation();
		this.setState({showSearchContainer:toggle})
	}

	render(){
		return (
			<div>			
				<nav className={styles.nav}>
					<div className={styles.hamburger} onClick={ () => this.props.toggleSideNav(true)}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					
					<form onClick={(e:any) => this.showSearchResultContainer(e, true)} autoComplete="off"> 
						<input type="text" placeholder="Search ..." name="query" onChange={(e:any) => {this.searchArwork(e)} }/>
					</form>
					<FontAwesomeIcon
						className={styles.logo} 
						icon="gavel" 
						size="1x" 
						style={{ transform: "scaleX(-1)"}}
					/>
				</nav>
				{this.state.showSearchContainer && <SearchResults searchResults={this.state.searchResults}
				showSearchResultContainer={this.showSearchResultContainer}/>}
			</div>

		);
	}
}
