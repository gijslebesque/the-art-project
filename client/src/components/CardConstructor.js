import React, {Component} from 'react';
import '../styles/artworks.scss';
import { Card, Icon, Image } from 'semantic-ui-react';


class CardConstructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 0
        }
    }
    render(){
        return(
            <Card>
            <Image src={this.props.artwork.artworkURL} />
            <Card.Content>
                <Card.Header>{this.props.artwork.artworkName}</Card.Header>
                <Card.Meta>
                    <span className='author'>By {this.props.artwork.author.username}</span>
                    <br/>
                    <span className='date'>At {this.props.artwork.createdAt}</span>
                </Card.Meta>
                <Card.Description>{this.props.artwork.artworkDescription}</Card.Description>
            
                </Card.Content>
                <Card.Content extra>

                <Icon name='user' />
                {this.props.artwork.author.favourite.length} liked
            </Card.Content>
            </Card>
        )
    }
}

export default CardConstructor;
