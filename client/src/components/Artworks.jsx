import React from 'react';
import '../styles/artworks.scss';
import { Card, Icon, Image } from 'semantic-ui-react'



const artworks = props => {
    
    let artworks = props.artworks.map((artwork, i) => {
        console.log(artwork)
        return(
            <Card key={i}>
            <Image src={artwork.artworkURL} />
    <Card.Content>
      <Card.Header>{artwork.artworkName}</Card.Header>
      <Card.Meta>
        <span className='date'>Created at {artwork.createdAt}}</span>
      </Card.Meta>
      <Card.Description>{artwork.artworkDescription}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
          
        )
    })

    return(
        <div>
            <div className="artworks">
                {artworks}
            </div>
          
    
        </div>
        
    );
}

export default artworks;