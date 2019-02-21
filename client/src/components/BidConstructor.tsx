import React, {Component} from 'react';
import styles from '../styles/artworks.module.scss';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';

import { Card, Icon, Image } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface IState {
    loading:boolean;
    artwork:any;
    days: number;
    hours: number;
    minutes:number;
    seconds:number;
    intervalId:any;
}


interface IProps {
    artwork:any;
    location:any;
}


export default class BidConstructor extends Component <IProps, IState>{
    service:any;
    constructor(props:any) {
        super(props);
        this.state = {
            loading: true,
            artwork:null,
            days: 0,
            hours: 0,
            minutes:0,
            seconds:0,
            intervalId:0
        }
        this.service = new AuthService();
    }

 
    componentDidMount(){
        let artworkId = this.props.location.search.slice(this.props.location.search.indexOf("=") + 1); 

        this.service.findSpecificArtwork(artworkId).then((res:any) => {
            console.log(res)
            this.setState({
                artwork:res,
                loading:false
            })
        }).catch((err:any) => {
            console.log("err", err)
        })
    }
    //check if actually string

    // auctionTimer(endDate:string){
    //     //End date is data string from back end;
    //     //Slice to get date without time.
    //     let sliced = endDate.slice(0, endDate.indexOf("T"));
    //     let deadline = new Date(sliced).getTime();
    //     let timeNow = new Date().getTime();
    //     let timeLeft = deadline - timeNow;     
        
    //     let days:any = Math.floor(timeLeft / (1000 * 3600 * 24)); 
    //     let hours:any = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    //     let minutes:any = Math.floor((timeLeft / (1000 * 60)) % 60);
    //     let seconds:any = Math.floor((timeLeft / 1000) % 60)
        
    //     hours = (hours < 10) ? "0" + hours : hours;
    //     minutes = (minutes < 10) ? "0" + minutes : minutes;
    //     seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    //     this.setState({
    //         days: days,
    //         hours: hours,
    //         minutes:minutes,
    //         seconds:seconds
    //    });
          
    // }
    
    // componentWillMount(){
    //     const intervalID = setInterval( () => {
    //         this.auctionTimer(this.props.artwork.auction.endDate);   
    //     }, 1000 );   
    //     this.setState({intervalId:intervalID});
    // }
   
    onClick = (artwork:any) => {
        //show pop up and make bid
        console.log(artwork)
    }
    follow = () => {
        //follow artist
    }
    
    render(){
        let artwork = this.state.artwork;
        let startDateFormat
        if(artwork){
        let startDate = artwork.createdAt.slice(0, artwork.createdAt.indexOf("T"));
        startDateFormat = new Date(startDate).toLocaleDateString();
    }
        return(<div>
                        {this.state.loading && 

<div >    

    <Loader 
        type="Triangle"
        color="#b0e0e6"
        height="50"	
        width="50"
    />
    </div>
}
        {this.state.artwork &&
            <div className={styles.card}>  
            <p>Hi</p>
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
            }
            </div>
        
        );
    }
} 
