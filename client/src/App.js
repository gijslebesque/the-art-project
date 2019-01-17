import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.js';
import SideNavNotLoggedIn from './components/SideNavNotLoggedIn.jsx';
import SideNavLoggedIn from './components/SideNavLoggedIn.jsx';
import LoginModal from './components/LoginModal.js';
import AuthService from './authenticate.js';
import Profile from './components/Profile.js';
import FileUpload from './components/FileUpload.js';
import Footer from './components/Footer.jsx'


import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo, faTimes, faGavel } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo, faTimes, faGavel);

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			authed:false,
			username:null,
			loading: false,
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
					username:res.username,
					authed:true,
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
				{!this.state.authed && 
				<SideNavNotLoggedIn 
					toggleSideNav={this.toggleSideNav} 
					isOpen={this.state.sideNaveOpen}
					userLoggedIn={this.state.authed}
					toggleLoginModal={this.toggleLoginModal}
					toggleUploadModal={this.toggleUploadModal}
				/>}
				{this.state.authed && 
				<SideNavLoggedIn 
					toggleSideNav={this.toggleSideNav} 
					isOpen={this.state.sideNaveOpen}
					userLoggedIn={this.state.authed}
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
				
					<PrivateRoute authed={this.state.authed} exact path='/profile' component={Profile} />

      			</Switch>
			
		
			</main>
			<Footer />

      		</div>
    	);
  	}
}

function PrivateRoute ({component: Component, authed, ...rest}) {
	return (
	  <Route
		{...rest}
		render={(props) => authed === true
		  ? <Component {...props} />
		  : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
	  />
	)
  }

export default App;
