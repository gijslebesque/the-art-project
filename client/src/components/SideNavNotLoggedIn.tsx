import React from "react";
import styles from "../styles/sideNav.module.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//READ https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935

interface ISideNav {
	toggleSideNav: any;
	isOpen: boolean;
	toggleLoginModal: any;
}

const sideNav: React.SFC<ISideNav> = ({
	toggleSideNav,
	isOpen,
	toggleLoginModal
}) => {
	let cssClass = "";
	if (isOpen) {
		cssClass = styles.open;
	}
	return (
		<div>
			<div className={`${styles.sideNav} ${cssClass}`}>
				<div
					style={{ float: "right" }}
					onClick={() => {
						toggleSideNav(false);
					}}
				>
					<FontAwesomeIcon icon="times" size="2x" />
				</div>
				<div className={styles.navigation}>
					<Link
						to="/"
						onClick={() => {
							toggleSideNav(false);
						}}
					>
						Home
					</Link>
					<button
						className={styles.linkBtn}
						onClick={e => {
							toggleSideNav(false);
							toggleLoginModal(true);
						}}
					>
						Loging/register
					</button>
				</div>
			</div>
			<div
				className={`${styles.fullScreenNav} ${cssClass}`}
				onClick={e => {
					toggleSideNav(false);
				}}
			/>
		</div>
	);
};
export default sideNav;
