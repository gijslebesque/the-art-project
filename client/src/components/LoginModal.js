import React, {Component} from 'react';
import '../styles/modal.scss';
import '../styles/form.scss';
import Button from './Button.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class LoginModal extends Component {
    constructor(props){
        super(props)
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
                    <form>
                        <input type="text" placeholder="Username" name="username"/>
                        <input type="Password" placeholder="password" name="password"/>
                        <Button type="submit" text="Login"/>
                      
                    </form>
                    <hr/>
                    <h3>Or register</h3>
                    <form>
                        <input type="text" placeholder="Username" name="username"/>
                        <input type="email" placeholder="Email" name="email"/>
                        <input type="Password" placeholder="password" name="password"/>
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
  