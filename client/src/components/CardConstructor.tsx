import React, {Component} from 'react';
import styles from '../styles/artworks.module.scss';
import history from '../history';
import { Card, Icon, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface IState {
    days: number;
    hours: number;
    minutes:number;
    seconds:number;
    intervalId:any;
}


interface IProps {
    artwork:any
}


export default class CardConstructor extends Component <IProps, IState> {

    constructor(props:any) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes:0,
            seconds:0,
            intervalId:0
        }
    }
    
    componentWillMount(){
    
    }
   
    showFullArtwork = (artwork:any) => {
        //show pop up and make bid
        console.log(artwork)

        history.push(`/artwork?id=${artwork._id}`);
    }
    follow = () => {
        //follow artist
    }
    
    render(){
        let artwork = this.props.artwork;
        let startDate = artwork.createdAt.slice(0, artwork.createdAt.indexOf("T"));
        let startDateFormat = new Date(startDate).toLocaleDateString();
    
        return(
            <div className={styles.singleCard} onClick={() =>{this.showFullArtwork(artwork)} }>  
                    <img src={artwork.artworkURL} />
                    <h3>{artwork.author.username}</h3>
                  
                    <p>{artwork.artworkName}</p>
                    <p>{artwork.description}</p>
                    <p>{artwork.auction.originalPrice}</p>   
            </div>
        );
    }
} 
