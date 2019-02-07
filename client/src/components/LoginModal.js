import React, {Component} from 'react';
import '../styles/modal.scss';
import '../styles/form.scss';
import Button from './Button.jsx';
import Modal from 'react-responsive-modal';
import Loader from 'react-loader-spinner';
import {spinnerCenterOverlay} from '../styles/spinner.module.scss';

class LoginModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: props.loading,
            errorMessage:null,
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
    hasErrored = () =>{
        console.log("rr",this.props.errorMessage)
        if(this.props.errorMessage){
            this.setState({
                loading:false,
                errorMessage: <p>this.props.errorMessage</p>
            })
        }
    }
 
	render() {
       
    	return (
            <Modal open={this.props.isOpen} onClose={ e =>{this.props.toggleLoginModal(false)}}>
             <h3>Login</h3>
             {this.state.errorMessage}
                    <form onSubmit={e => {
                        this.setState({loading:true})
                        this.props.handleLoginSubmit(e, this.state.login)}}>
                        <input type="text" placeholder="Username" name="username" onChange={this.handleChangeLogin} value={this.state.login.username}/>
                        <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeLogin} value={this.state.login.password}/>
                        <Button type="submit" text="Login"/>
                      
                    </form>

                    <h3>Or register</h3>
                    <form onSubmit={e => {
                        this.setState({loading:true})
                        this.props.handleRegisterSubmit(e, this.state.register)}}>
                        <input type="text" placeholder="Username" name="username" onChange={this.handleChangeRegister} value={this.state.register.username}/>
                         <input type="email" placeholder="Email" name="email" onChange={this.handleChangeRegister} value={this.state.register.email}/>
                         <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeRegister} value={this.state.register.password}/>
                         <Button type="submit" text="Register"/>
                    
                     </form>
                     {this.state.loading && <div className={spinnerCenterOverlay}>    
                    <Loader 
                    	type="Triangle"
                        color="#b0e0e6"
                        height="50"	
                        width="50"
                    /> 
					<p>One moment...</p>
                    </div>}
            
            </Modal>
            // <Modal open={this.props.isOpen} onClose={this.onCloseModal}>    		<div className={`modal ${cssClass}`}>
        	// 	<div className={`modal-body ${cssClass}`}>
            //     <FontAwesomeIcon 
            //         icon="times" 
            //         size="2x" 
            //         style={{position:"absolute", right:"20px",
            //         top:"20px"}} 
            //         onClick={e => {this.props.toggleLoginModal(false)}}
            //     />
            //         <h3>Login</h3>
            //         <form onSubmit={e => {this.props.handleLoginSubmit(e, this.state.login)}}>
            //             <input type="text" placeholder="Username" name="username" onChange={this.handleChangeLogin} value={this.state.login.username}/>
            //             <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeLogin} value={this.state.login.password}/>
            //             <Button type="submit" text="Login"/>
                      
            //         </form>
            //         <hr/>
            //         <h3>Or register</h3>
            //         <form onSubmit={e => {this.props.handleRegisterSubmit(e, this.state.register)}}>
            //             <input type="text" placeholder="Username" name="username" onChange={this.handleChangeRegister} value={this.state.register.username}/>
            //             <input type="email" placeholder="Email" name="email" onChange={this.handleChangeRegister} value={this.state.register.email}/>
            //             <input type="Password" placeholder="Password" name="password" onChange={this.handleChangeRegister} value={this.state.register.password}/>
            //             <Button type="submit" text="Register"/>
                    
            //         </form>
    		// 	</div>  
            //     <div className={`full-screen-modal ${cssClass}`}
            //     onClick={e=> {this.props.toggleLoginModal(false)}}
            //     />
    		// </div>
          //  </Modal>

      	);
    }
}
  
export default LoginModal;
  