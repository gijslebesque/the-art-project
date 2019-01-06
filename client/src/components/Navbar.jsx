import React from 'react';
import '../styles/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = props => {
		
	return (

		<nav className="nav">
			<div className="hamburger" onClick={() => props.toggleSideNav(true)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			

			<form action="">
				<input type="text" placeholder="Search ..."/>
			</form>
			<FontAwesomeIcon 
				icon="gavel" 
				size="1x" 
				style={{ transform: "scaleX(-1)"}}
			/>
		</nav>
	)

}

export default Navbar;