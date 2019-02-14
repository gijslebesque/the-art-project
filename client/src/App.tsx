import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SideNavNotLoggedIn from './components/SideNavNotLoggedIn';
import SideNavLoggedIn from './components/SideNavLoggedIn';
import LoginModal from './components/LoginModal';
import AuthService from './authenticate.js';
import Profile from './components/Profile';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import history from './history';

import  helpers from './helpers';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo, faTimes, faGavel } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo, faTimes, faGavel);

// interface IProps {
// 	prevProps:any
// }

interface IState{
	authed: boolean;
	username:string;
	loading: boolean;
	sideNaveOpen: boolean;
	loginModalOpen: boolean;
	uploadModalOpen:boolean;
	errorMessageLogin: any;
	errorMessageRegister:any;
	
}

class App extends Component <{}, IState> {
	service:any;
	public constructor(props:any){
		super(props)
		this.state = {
			authed: false,
			username:"",
			loading: false,
			sideNaveOpen: false,
			loginModalOpen: false,
			uploadModalOpen:false,
			errorMessageLogin:null,
			errorMessageRegister:null
			
		}

		this.service = new AuthService();
	}

	componentWillMount(){
		
		let user = JSON.parse(localStorage.getItem('user') || "{}" );
		
		console.log(user)
		if(!helpers.isEmpty(user)){
			console.log("hoi")
			this.setState({
				authed:true,
				username:user.username
			});
		}		
	}

	toggleSideNav = (toggle:boolean) =>{
		this.setState({sideNaveOpen:toggle})
	}
	
	toggleLoginModal = (toggle:boolean) =>{
		this.setState({loginModalOpen:toggle})
	}
	
	toggleUploadModal = (toggle:boolean) =>{
		this.setState({uploadModalOpen:toggle})
	}

	handleLoginSubmit = (e:any, input:any) => {
		e.preventDefault();
		const {username, password } = input;
		
		  this.service.login(username, password)
			.then( (res:any) => {
				
				localStorage.setItem('jwtToken', JSON.stringify(res.token));
				localStorage.setItem('user', JSON.stringify(res.user))

				this.setState({
					username:res.username,
					authed:true,
					loginModalOpen:false
				});
				
				history.push('/profile')
			
			}).catch( (err:any) => {
				debugger
				console.log("ERROR") 
				this.setState({
					loading:false,
					errorMessageLogin:err
					})
				});
	}

	handleRegisterSubmit = (e:any, input:any) => {
		e.preventDefault();
		const {username, email, password } = input;
		console.log(username)
		this.setState({loading:true})
      	this.service.register(username, email, password)
			.then( (res:any) => {

				//Not SURE YET
				localStorage.setItem('jwtToken', JSON.stringify(res.token));

				localStorage.setItem('user', JSON.stringify(res.user))
				debugger;
				this.setState({
					username:res.username,
					authed:true,
					loginModalOpen:false
				});


			}).catch( (err:any) => {
			
				this.setState({
					loading:false,
					errorMessageRegister:err
					})
			});
	}

	getUserInfo = (e:any) => {
		e.preventDefault();
		let token = JSON.parse(localStorage.getItem('jwtToken') || "{}")
		console.log(token)
		this.service.getUserInfo(token).then((res:any) =>{
			console.log(res)
		})
	}

	render() {
		
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
						loading={this.state.loading}
						errorMessageLogin={this.state.errorMessageLogin}
						errorMessageRegister={this.state.errorMessageRegister}
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
					
						<PrivateRoute authed={this.state.authed} username={this.state.username} exact path='/profile' component={Profile} />

					</Switch>
			
			</main>
			<Footer />

      		</div>
    	);
  	}
}


export default App;
