import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.js';
import SideNavNotLoggedIn from './components/SideNavNotLoggedIn.jsx';
import SideNavLoggedIn from './components/SideNavLoggedIn.jsx';
import LoginModal from './components/LoginModal.js';
import AuthService from './authenticate.js';
import Profile from './components/Profile.js';
import FileUpload from './components/FileUpload.js';
import FindArtwork from './components/FindArtwork';
import Footer from './components/Footer.jsx'


import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo, faTimes, faGavel } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo, faTimes, faGavel);

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			loading: false,
			isLoggedIn: false,
			sideNaveOpen: false,
			loginModalOpen: false,
			uploadModalOpen:false,
			
		}
		this.service = new AuthService();
	}

	toggleSideNav = (toggle) =>{
		this.setState({sideNaveOpen:toggle})
	}
	
	toggleLoginModal = (toggle) =>{
		this.setState({loginModalOpen:toggle})
	}
	
	toggleUploadModal = (toggle) =>{
		this.setState({uploadModalOpen:toggle})
	}

	handleLoginSubmit = (e, input) => {
		e.preventDefault();
		const {username, password } = input;
		console.log(username)
      	this.service.login(username, password)
			.then( res => {
				this.setState({
					isLoggedIn:true,
					loginModalOpen:false
				});
				
				console.log(res);
				// if(!res.message){
				// 	history.push("/tasks")
				// }            
				// else{
				// 	this.setState(prevState => ({
				// 		register: {
				// 			...prevState.register,
				// 			errorMessage: res.message
				// 		}
				// 	}))
				// }

			}).catch( err => console.log(err));
	}

	handleRegisterSubmit = (e, input) => {
		e.preventDefault();
		const {username, email, password } = input;
		console.log(username)
      	this.service.register(username, email, password)
			.then( res => {
				console.log(res);
				// if(!res.message){
				// 	history.push("/tasks")
				// }            
				// else{
				// 	this.setState(prevState => ({
				// 		register: {
				// 			...prevState.register,
				// 			errorMessage: res.message
				// 		}
				// 	}))
				// }

			}).catch( err => console.log(err));
	}



	render() {
		console.log(this.state)
    	return (
    		<div className="App">
		
    			<Navbar toggleSideNav={this.toggleSideNav}/>
				{!this.state.isLoggedIn && 
				<SideNavNotLoggedIn 
					toggleSideNav={this.toggleSideNav} 
					isOpen={this.state.sideNaveOpen}
					userLoggedIn={this.state.isLoggedIn}
					toggleLoginModal={this.toggleLoginModal}
					toggleUploadModal={this.toggleUploadModal}
				/>}
				{this.state.isLoggedIn && 
				<SideNavLoggedIn 
					toggleSideNav={this.toggleSideNav} 
					isOpen={this.state.sideNaveOpen}
					userLoggedIn={this.state.isLoggedIn}
					toggleLoginModal={this.toggleLoginModal}
					toggleUploadModal={this.toggleUploadModal}
				/>}
					<main>

				<LoginModal 
					toggleLoginModal={this.toggleLoginModal} 
					isOpen={this.state.loginModalOpen} 
					handleLoginSubmit={this.handleLoginSubmit}
					handleRegisterSubmit={this.handleRegisterSubmit}
				/>
				{this.state.uploadModalOpen && <FileUpload 
					toggleUploadModal={this.toggleUploadModal} 
					isOpen={this.state.uploadModalOpen} 
				
				/>}

				<Switch>
        			<Route exact path='/' component={Home}/>
					<Route exact path='/profile' component={Profile}/>
      			</Switch>
			
			<FindArtwork method="findRecentArtworks"/>
			</main>
			<Footer />

      		</div>
    	);
  	}
}

export default App;
