import React from 'react';
import '../styles/navbar.scss';

const Navbar = props => {
		
	return (

		<nav className="nav">
		<div className="hamburger" onClick={() => props.toggleSideNav(true)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			

			<form action="">
				<input type="text"/>
			</form>
		</nav>
	)

}

export default Navbar;