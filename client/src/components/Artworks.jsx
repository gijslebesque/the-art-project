import React from 'react';
import '../styles/artworks.scss';

const artworks = props => {
    
    let artworks = props.artworks.map((artwork, i) => {
        console.log(artwork)
        return(
            <div className="artwork" key={i}>
                <img src={artwork.artworkURL} alt={artwork.artworkDescription}/>
                {/* <p>Description: {artwork.artworkDescription}</p> */}
            </div>
        )
    })

    return(
        <div>
            <h2>Recent artworks</h2>
            <div className="artworks">
                {artworks}
            </div>
        </div>
        
    );
}

export default artworks;