import React, {Component} from 'react';
import styles from '../styles/artworks.module.scss';
import { Card, Icon, Image } from 'semantic-ui-react';

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
   
    onClick = (e:any, artwork:any) => {
        //show pop up and make bid
        e.preventDefault();
        console.log(artwork)
    }
    
    render(){
        let artwork = this.props.artwork;
        return(
            <div className="card">
                <div className="header">
                    <h2>{artwork.artworkName}</h2>
                </div>

                <img src={artwork.artworkURL} />
                <div className="share">
                    <button>Favouritise</button>
                    <button>Share</button>
                </div>

                <div className="body">
                    <p>{artwork.author.username}</p>
                    <p>{artwork.artworkName}</p>

                    <p>{artwork.description}</p>

                    <p>materials</p>
                  
                </div>

                <hr/>

                <h3>Starting bid</h3>
                <h3>$ {artwork.auction.originalPrice}</h3>
                <hr/>

                <p>Place bid</p>
                <h3>Starting bid</h3>
                <select name="bidding">
                    <option value="1">{artwork.auction.originalPrice + 10}</option>
                    <option value="2">{artwork.auction.originalPrice + 20}</option>
                    <option value="3">{artwork.auction.originalPrice + 30}</option>
                    <option value="3">{artwork.auction.originalPrice + 40}</option>
                </select>

            </div>


            // <Card>
            // <Image src={artwork.artworkURL} />
            // <Card.Content>
            //     <Card.Header>{artwork.artworkName}</Card.Header>
            //     <Card.Meta>
            //         <span className='author'>By {artwork.author.username}</span>
            //         <br/>
            //         <span className='date'>At {artwork.createdAt}</span>
            //     </Card.Meta>
            //     <Card.Description>
            //     {artwork.artworkDescription}
            //    <p>Time Remaining {this.state.days} days, {this.state.hours}hours  {this.state.minutes} minutes {this.state.seconds}</p>
            //     <p>Price: {artwork.auction.originalPrice}</p>

            //   <button onClick={(e:any) =>{ {this.onClick(e, artwork)}}}>Bid</button>

            //     </Card.Description>
            
            //     </Card.Content>
            //     <Card.Content extra>
             
            //     <Icon name='user' />
            //     {this.props.artwork.author.favourite.length} liked
            // </Card.Content>
            // </Card>
        )
    }
} 
