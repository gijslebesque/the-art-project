import React from 'react';
import styles from '../styles/sideNav.module.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const sideNav = props => {
    let cssClass = "";
    if(props.isOpen){
        cssClass = styles.open;
    }
    return (

        <div>
            <div className={`${styles.sideNav} ${cssClass}`}>
                <FontAwesomeIcon 
                    icon="times" 
                    size="2x" 
                    style={{float:"right"}} 
                    onClick={e => {props.toggleSideNav(false)}}
                />
                <div className={styles.navigation}>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button className={styles.linkBtn} onClick={e => {props.toggleUploadModal(true)}}>Add art</button>
                    <button className={styles.linkBtn}>Favourites</button>
                    <button className={styles.linkBtn}>Logout</button>
                </div>
            </div>
            <div 
                className={`${styles.fullScreenNav} ${cssClass}`}
                onClick={e => {props.toggleSideNav(false)}}
            />       
        </div>
    );
}
export default sideNav;