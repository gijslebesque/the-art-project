import React from 'react';
import styles from '../styles/navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = props => {
		
	return (

		<nav className={styles.nav}>
			<div className={styles.hamburger} onClick={() => props.toggleSideNav(true)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			
			<form action="">
				<input type="text" placeholder="Search ..."/>
			</form>
			<FontAwesomeIcon
				className={styles.logo} 
				icon="gavel" 
				size="1x" 
				style={{ transform: "scaleX(-1)"}}
			/>
		</nav>
	)

}

export default Navbar;