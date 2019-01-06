import React, {Component} from 'react';
import '../styles/modal.scss';
import '../styles/form.scss';
import Button from './Button.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class LoginModal extends Component {
    constructor(props){
        super(props)
        this.state = {
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

    handleChangeLogin = e => {
        const {name, value} = e.target;
        this.setState(prevState => ({
        	login: {
            	...prevState.login,
            	[name]: value
          	}
      	}));
    }
  
    handleChangeRegister = e => {
    	const {name, value} = e.target;
    		this.setState(prevState => ({
        	register: {
            	...prevState.register,
            	[name]: value
        	}
    	}));
	}

	render() {
        let cssClass = "";
        if(this.props.isOpen){
            cssClass = "open";
        }
    	return (
    		<div className={`modal ${cssClass}`}>
        		<div className={`modal-body ${cssClass}`}>
                <FontAwesomeIcon 
                    icon="times" 
                    size="2x" 
                    style={{position:"absolute", right:"20px",
                    top:"20px"}} 
                    onClick={e => {this.props.toggleLoginModal(false)}}
                />
                    <h3>Login</h3>
                    <form onSubmit={e => {this.props.handleLoginSubmit(e, this.state.login)}}>
                        <input type="text" placeholder="Username" name="username" onChange={this.handleChangeLogin} value={this.state.login.username}/>
                        <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeLogin} value={this.state.login.password}/>
                        <Button type="submit" text="Login"/>
                      
                    </form>
                    <hr/>
                    <h3>Or register</h3>
                    <form onSubmit={e => {this.props.handleRegisterSubmit(e, this.state.register)}}>
                        <input type="text" placeholder="Username" name="username" onChange={this.handleChangeRegister} value={this.state.register.username}/>
                        <input type="email" placeholder="Email" name="email" onChange={this.handleChangeRegister} value={this.state.register.email}/>
                        <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeRegister} value={this.state.register.password}/>
                        <Button type="submit" text="Register"/>
                    
                    </form>
    			</div>  
                <div className={`full-screen-modal ${cssClass}`}
                onClick={e=> {this.props.toggleLoginModal(false)}}
                />
    		</div>
      	);
    }
}
  
export default LoginModal;
  