import React from 'react';
import '../styles/sideNav.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const sideNav = props => {
    let cssClass = "";
    if(props.isOpen){
        cssClass = "open";
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
                    <Link to="/">Your profile</Link>
                    <p onClick={e =>{props.toggleUploadModal(true)}}>Add art</p>
                    <Link to="/">Favourite</Link>
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