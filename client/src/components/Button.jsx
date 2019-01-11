import React from 'react';

const button = props => {
    return (
        <button className="btnPrimary" type={props.type}>{props.text}</button>
    );
}

export default button;