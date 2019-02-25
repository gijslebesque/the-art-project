import React, {Component} from 'react';
import styles from '../styles/artworks.module.scss';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import loaderStyles from '../styles/spinner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import helpers from '../helpers';

interface IState {
    loading:boolean;
    artwork:any;
    days: number;
    hours: number;
    minutes:number;
    seconds:number;
    intervalId:any;
    bidAmount:number;
}


interface IProps {
    location:any;
    toggleLoginModal:any;
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
            intervalId:0,
            bidAmount:0
        }
        this.service = new AuthService();
    }

    componentDidMount(){
        console.log(this.props.toggleLoginModal)
        let params = new URLSearchParams(this.props.location.search);
        let artworkId = params.get("id");
    
        this.service.findSpecificArtwork(artworkId).then((res:any) => {
            console.log(res)
           
            const intervalId = setInterval( () => {
                this.auctionTimer(res.auction.endDate);   
            }, 1000 );   

            this.setState({
                artwork:res,
                loading:false,
                intervalId:intervalId,
                bidAmount:res.auction.originalPrice + 10
            });

        }).catch((err:any) => {
            console.log("err", err)
        });
    }

    auctionTimer(endDate:string){
        // End date is data string from back end;
        // Slice to get date without time.
        let sliced = endDate.slice(0, endDate.indexOf("T"));
        let deadline = new Date(sliced).getTime();
        let timeNow = new Date().getTime();
        let timeLeft = deadline - timeNow;     
        
        let days:any = Math.floor(timeLeft / (1000 * 3600 * 24)); 
        let hours:any = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes:any = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds:any = Math.floor((timeLeft / 1000) % 60)
        
        hours = (hours < 10 && hours >= 0 ) ? "0" + hours : hours;
        minutes = (minutes < 10 && minutes >=0 ) ? "0" + minutes : minutes;
        seconds = (seconds < 10 && seconds >=0 ) ? "0" + seconds : seconds;
    
        this.setState({
            days: days,
            hours: hours,
            minutes:minutes,
            seconds:seconds
       });
          
    }
    
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
   
    makeBid = (artwork:any) => {
        //show pop up and make bid
        console.log(artwork)
		let token = JSON.parse(localStorage.getItem('jwtToken') || "{}")
        if(helpers.isEmpty(token)){
            this.props.toggleLoginModal(true);
            return true;
        }
        const data = {
            id:artwork._id,
            bidAmount: Number(this.state.bidAmount)
        }
        console.log(typeof data.bidAmount)

        this.service.makeBid(token, data).then((res:any) => {
            console.log("RESS", res);
            this.setState({artwork:res, });
        }).catch((err:any) => {
            console.log("session expired")
            debugger;
            this.props.toggleLoginModal(true);

        });
    }
    follow = () => {
        //follow artist
    }

    handleChange(e:any) {

        let {value} = e.target;
        this.setState({
            bidAmount: value,
        }, () => {

            console.log(this.state.bidAmount)

        });
    }
    
    render(){
        let artwork = this.state.artwork;
        let startDateFormat;
        let price;

        if(artwork){
            let startDate = artwork.createdAt.slice(0, artwork.createdAt.indexOf("T"));
            artwork.auction.bid ? price = artwork.auction.bid : price = artwork.auction.original;
            startDateFormat = new Date(startDate).toLocaleDateString();
        }
        return(
            <div className={styles.artworks}>
                {this.state.loading && 
                    <div className={loaderStyles.spinnerCenter}>    
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
                                <h3>$ {price}</h3>
                            </div>
                        
                            <hr/>

                            <p>Place bid</p>

                            <select name="bidding" onChange={(e) => this.handleChange(e) }>
                                <option value={price + 10}>$ {price + 10}</option>
                                <option value={price + 20}>$ {price + 20}</option>
                                <option value={price + 30}>$ {price + 30}</option>
                                <option value={price + 40}>$ {price + 40}</option>
                            </select>

                            <button className={styles.ctaBtn} onClick={() =>{ {this.makeBid(artwork)}}}>Bid</button>
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
