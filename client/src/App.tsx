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
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute';
import history from './history';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo, faTimes, faGavel } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo, faTimes, faGavel);



// interface IProps{
// 	props:any
	
// }


// interface IState{
// 	service:any,
// 	authed: boolean,
// 	username:null,
// 	loading: boolean,
// 	sideNaveOpen: boolean,
// 	loginModalOpen: boolean,
// 	uploadModalOpen:boolean,
// 	errorMessage: null
	
// }



class App extends Component <any, any> {
	service:any;
	public constructor(props:any){
		super(props)
		this.state = {
			authed: false,
			username:null,
			loading: false,
			sideNaveOpen: false,
			loginModalOpen: false,
			uploadModalOpen:false,
			errorMessage:null
			
		}

		this.service = new AuthService();
	}
	componentWillMount(){
		let user = JSON.parse(localStorage.getItem('user') || "{}" );
		
	
		if(user){
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
				console.log("ERROR") 
				this.setState({
					loading:true,
					errorMessage:err
					})
				});
	}

	handleRegisterSubmit = (e:any, input:any) => {
		e.preventDefault();
		const {username, email, password } = input;
		console.log(username)
      	this.service.register(username, email, password)
			.then( (res:any) => {
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

			}).catch( (err:any) => console.log(err));
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
					errorMessage={this.state.errorMessage}
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
