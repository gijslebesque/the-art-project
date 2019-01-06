import React from 'react';
import '../styles/sideNav.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const sideNav = props => {
    let cssClass = "";
    if(props.isOpen){
        cssClass = "open";
    }


    let linkToProfile;
    if(props.userLoggedIn){
        linkToProfile = <Link to="/">Your profile</Link>
    }
    else {
        linkToProfile = <p onClick={e =>{
            props.toggleSideNav(false)
            props.toggleLoginModal(true)}
        }>Your profile</p>
    }


    return (

       
        <div>
            <div className={`side-nav ${cssClass}`}>
                <FontAwesomeIcon 
                    icon="times" 
                    size="2x" 
                    style={{float:"right"}} 
                    onClick={e => {props.toggleSideNav(false)}}
                />
                <div className="navigation">
                    <Link to="/">Home</Link>
                    {linkToProfile}
                    <Link to="/">Add art</Link>
                </div>
            </div>
            <div 
                className={`full-screen-nav ${cssClass}`}
                onClick={e => {props.toggleSideNav(false)}}
            />       
        </div>
    );
}
export default sideNav;