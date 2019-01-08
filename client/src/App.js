import React, { Component } from 'react';
import './styles/App.scss';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.js';
import SideNav from './components/SideNav.jsx';
import LoginModal from './components/LoginModal.js';
import AuthService from './authenticate.js';
import Profile from './components/Profile.js';
import FileUpload from './components/FileUpload.js';

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
			loginModalOpen: false
			
		}
		this.service = new AuthService()
	}

	toggleSideNav = (toggle) =>{
		this.setState({sideNaveOpen:toggle})
	}
	
	toggleLoginModal = (toggle) =>{
		this.setState({loginModalOpen:toggle})
	}

	handleLoginSubmit = (e, input) => {
		e.preventDefault();
		const {username, password } = input;
		console.log(username)
      	this.service.login(username, password)
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
				<SideNav 
					toggleSideNav={this.toggleSideNav} 
					isOpen={this.state.sideNaveOpen}
					userLoggedIn={this.state.isLoggedIn}
					toggleLoginModal={this.toggleLoginModal}
				/>
				
				<LoginModal 
					toggleLoginModal={this.toggleLoginModal} 
					isOpen={this.state.loginModalOpen} 
					handleLoginSubmit={this.handleLoginSubmit}
					handleRegisterSubmit={this.handleRegisterSubmit}
				/>
				<Switch>
        			<Route exact path='/' component={Home}/>
					<Route exact path='/profile' component={Profile}/>
      			</Switch>
				<FileUpload />

      		</div>
    	);
  	}
}

export default App;
