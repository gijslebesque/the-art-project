import React, { Component } from 'react';
import './styles/App.scss';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.js';
import SideNav from './components/SideNav.jsx';
import LoginModal from './components/LoginModal.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo, faTimes)

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			sideNaveOpen: false,
			loginModalOpen: true,
			login: {
				username: "",
				password: ""
			},
			register: {
				username: "",
				email: "",
				password: ""
			}

		}
	}

	toggleSideNav = (toggle) =>{
		this.setState({sideNaveOpen:toggle})
	}
	
	toggleLoginModal = (toggle) =>{
		this.setState({loginModalOpen:toggle})
	}
	

	render() {
    	return (
    		<div className="App">
    			<Navbar toggleSideNav={this.toggleSideNav}/>
				<SideNav toggleSideNav={this.toggleSideNav} isOpen={this.state.sideNaveOpen}/>
				<LoginModal toggleLoginModal={this.toggleLoginModal} isOpen={this.state.loginModalOpen} />
				<Switch>
        			<Route exact path='/' component={Home}/>
      			</Switch>
      		</div>
    	);
  	}
}

export default App;
