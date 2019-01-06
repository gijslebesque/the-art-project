import React from 'react';

const button = props => {
    return (
        <button className="btn-primary" type={props.type}>{props.text}</button>
    );
}

export default button;