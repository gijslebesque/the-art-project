import React, { Component } from "react";
import "../styles/modal.scss";
import "../styles/form.scss";
import Button from "./Button";
import Modal from "react-responsive-modal";
import Loader from "react-loader-spinner";
import styles from "../styles/spinner.module.scss";
import modalBody from "../styles/modal.module.scss";

interface IProps {
	username?: string;
	errorMessageLogin: any;
	errorMessageRegister: any;
	loading: boolean;
	isOpen: any;
	toggleLoginModal: any;
	handleRegisterSubmit: any;
	handleLoginSubmit: any;
}

interface IState {
	styles: any;
	loading: boolean;
	errorMessage: any;
	login: {
		username: string;
		password: string;
	};
	register: {
		username: string;
		email: string;
		password: string;
	};
}

class LoginModal extends Component<IProps, IState> {
	modalBody: any;

	constructor(props: any) {
		super(props);
		this.state = {
			styles: styles,
			loading: props.loading,
			errorMessage: props.errorMessage,
			login: {
				username: "",
				password: ""
			},
			register: {
				username: "",
				email: "",
				password: ""
			}
		};
	}

	handleChangeLogin = (e: any) => {
		const { name, value } = e.target;
		this.setState(prevState => ({
			login: {
				...prevState.login,
				[name]: value
			}
		}));
	};

	handleChangeRegister = (e: any) => {
		const { name, value } = e.target;
		this.setState(prevState => ({
			register: {
				...prevState.register,
				[name]: value
			}
		}));
	};

	render() {
		let username = this.props.username;
		return (
			<Modal
				open={this.props.isOpen}
				onClose={() => {
					this.props.toggleLoginModal(false);
				}}
			>
				<div className={modalBody.modalBody} />
				<h3>Login</h3>
				{this.props.errorMessageLogin}
				<form
					autoComplete="on"
					onSubmit={e => {
						this.setState({ loading: true });
						this.props.handleLoginSubmit(e, this.state.login);
					}}
				>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={this.handleChangeLogin}
						value={
							!this.state.login.username ? username : this.state.login.username
						}
					/>
					<input
						type="Password"
						placeholder="Password"
						name="password"
						onChange={this.handleChangeLogin}
						value={this.state.login.password}
					/>
					<Button type="submit" text="Login" />
				</form>

				<h3>Or register</h3>
				{this.props.errorMessageRegister}
				<form
					onSubmit={e => {
						this.setState({ loading: true });
						this.props.handleRegisterSubmit(e, this.state.register);
					}}
				>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={this.handleChangeRegister}
						value={this.state.register.username}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={this.handleChangeRegister}
						value={this.state.register.email}
					/>
					<input
						type="Password"
						placeholder="Password"
						name="password"
						onChange={this.handleChangeRegister}
						value={this.state.register.password}
					/>
					<Button type="submit" text="Register" />
				</form>
				{this.props.loading && (
					<div className={styles.spinnerCenterOverlay}>
						<Loader type="Triangle" color="#b0e0e6" height="50" width="50" />
						<p>One moment...</p>
					</div>
				)}
			</Modal>
		);
	}
}

export default LoginModal;
