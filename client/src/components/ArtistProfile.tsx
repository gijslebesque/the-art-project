import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import loaderStyles from '../styles/spinner.module.scss';
import artworkStyles from '../styles/artworks.module.scss';
import CardConstructor from './CardConstructor';

interface IProps {
    location:any
}

interface IState {
    artist:any;
    loading:boolean;
}

export default class ArtistProfile extends Component <IProps, IState>{
    service:any;
    constructor(props:any){
        super(props);
        this.state = {
            artist:null,
            loading:true
        }
        this.service = new AuthService();
    }

    componentDidMount(){
      
        let params = new URLSearchParams(this.props.location.search);
        let artistId = params.get("id");
        console.log("hi")
        this.service.findArtist(artistId).then((res:any) => {
            this.setState({
                artist:res,
                loading:false
           })
            // const intervalId = setInterval( () => {
            //     this.auctionTimer(res.auction.endDate);   
            // }, 1000 );   

            // this.setState({
            //     artwork:res,
            //     loading:false,
            //     intervalId:intervalId
            // });

        }).catch((err:any) => {
            console.log("err", err)
        });
    }
    artist = () => {
        if(!this.state.artist) return null;
        let artist = this.state.artist;
        let artworks = null;
        if(artist.artworks) {
                artworks = artist.artworks.map((artwork:any, i:number) => {
                    return(
                        <CardConstructor key={i} artwork={artwork}/>
                    );
                })
            
        }

        return(
            <>
              <h1>{artist.username}</h1>
              <div className={artworkStyles.artworks}>
                 {artworks}
              </div>
            </>
           
        )
    }
    render(){
        let artist = this.artist();
        return(
            <div className="artistProfile">
                  <div className={loaderStyles.spinnerCenter}>    
                      { this.state.loading && <Loader 
                            type="Triangle"
                            color="#b0e0e6"
                            height="50"	
                            width="50"
                        />}
                    </div>
                    {artist}
            </div>
        )
    };
}