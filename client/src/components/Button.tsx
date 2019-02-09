import React from 'react';

const button = (props:any) => {
    return (
        <button className="btnPrimary" type={props.type}>{props.text}</button>
    );
}

export default button;