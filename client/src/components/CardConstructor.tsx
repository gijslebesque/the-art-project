import React, {Component} from 'react';
import styles from '../styles/artworks.module.scss';
import { Card, Icon, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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


export default class CardConstructor extends Component <IProps, IState>{
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
    //check if actually string
    auctionTimer(endDate:string){
        //End date is data string from back end;
        //Slice to get date without time.
        let sliced = endDate.slice(0, endDate.indexOf("T"))
        let deadline = new Date(sliced).getTime();
        let timeNow = new Date().getTime();
        let timeLeft = deadline - timeNow;     
        

        let days = Math.floor(timeLeft / (1000 * 3600 * 24)); 
        let hours:any = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes:any = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds:any = Math.floor((timeLeft / 1000) % 60)
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
    
       
        this.setState({
            days: days,
            hours: hours,
            minutes:minutes,
            seconds:seconds
       });
          
    }
    
    componentWillMount(){
        const intervalID = setInterval( () => {
            this.auctionTimer(this.props.artwork.auction.endDate);   
        }, 1000 );   
        this.setState({intervalId:intervalID});
    }
   
    onClick = (artwork:any) => {
        //show pop up and make bid
        console.log(artwork)
    }
    follow = () => {
        //follow artist
    }
    
    render(){
        let artwork = this.props.artwork;
        let startDate = artwork.createdAt.slice(0, artwork.createdAt.indexOf("T"));
        let startDateFormat = new Date(startDate).toLocaleDateString();
    
        return(
            <div className={styles.card}>  
                <div className={styles.column}>
                    <h3>{artwork.artworkName}</h3>
                    <img src={artwork.artworkURL} />

                    <div className={styles.shareRow}>
                        <button>Favouritise</button>
                        <button>Share</button>
                    </div>
                </div>
                <div className={styles.column}>
                    <h3>{artwork.author.username}</h3>
                    <span className={styles.followBtn} onClick={ () =>{ this.follow()}}><FontAwesomeIcon icon="plus-circle" /> Follow</span>
                
                    <div className={styles.body}>
                 
                        <p>{artwork.artworkName}</p>
                        <p>{artwork.description}</p>
                        <p>materials</p>
                  
                    </div>

                    <hr/>

                    <div className={styles.bidRow}>
                        <h3>Starting bid</h3>
                        <h3>$ {artwork.auction.originalPrice}</h3>
                    </div>
                
                    <hr/>

                    <p>Place bid</p>

                    <select name="bidding">
                        <option value="1">$ {artwork.auction.originalPrice + 10}</option>
                        <option value="2">$ {artwork.auction.originalPrice + 20}</option>
                        <option value="3">$ {artwork.auction.originalPrice + 30}</option>
                        <option value="4">$ {artwork.auction.originalPrice + 40}</option>
                    </select>

                    <button className={styles.ctaBtn} onClick={() =>{ {this.onClick(artwork)}}}>Bid</button>
                    <div className={styles.timeLeft}>
                        <h3>{this.state.days}d {this.state.hours}h {this.state.minutes}m {this.state.seconds}s</h3>
                        <h3>Live {startDateFormat}</h3>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }
} 
