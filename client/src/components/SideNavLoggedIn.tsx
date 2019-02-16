import React from 'react';
import styles from '../styles/sideNav.module.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface ISideNav {
    toggleUploadModal:any;
    toggleSideNav:any;
    logout:any;
    isOpen:boolean;
    
}

const sideNav:React.SFC<ISideNav> = ({toggleUploadModal, toggleSideNav, logout, isOpen}) => {
    let cssClass:string = "";
    if(isOpen){
        cssClass = styles.open;
    }
    return (

        <div>
            <div className={`${styles.sideNav} ${cssClass}`}>
            <div  style={{float:"right"}}  onClick={() => {toggleSideNav(false)}}>
                <FontAwesomeIcon 
                    icon="times" 
                    size="2x" 
                
                />
                </div >
                <div className={styles.navigation}>
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <button className={styles.linkBtn} onClick={e => {toggleUploadModal(true)}}>Add art</button>
                    <button className={styles.linkBtn}>Favourites</button>
                    <button onClick={e => {logout()}} className={styles.linkBtn}>Logout</button>
                </div>
            </div>
            <div 
                className={`${styles.fullScreenNav} ${cssClass}`}
                onClick={e => {toggleSideNav(false)}}
            />       
        </div>
    );
}
export default sideNav;