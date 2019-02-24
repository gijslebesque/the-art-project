import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import loaderStyles from '../styles/spinner.module.scss';
import artworkStyles from '../styles/artworks.module.scss';
import helpers from '../helpers';
import BidConstructor from './BidConstructor';
import CardConstructor from './CardConstructor';

interface IState {
    artworks:any;
    loading:boolean;
} 

class FindArtwork extends Component <any, IState> {
    service:any;
   
    constructor(props:any){
        super(props)
        this.state = {
            artworks:null,
            loading:true
        }

        this.service = new AuthService();
    }

    componentDidMount() {

        switch(this.props.method) {
            case "findRecentArtworks":
                this.service.findRecentArtWorks().then((res:any) => {
                 
                    this.setState({
                        artworks: res,
                        loading:false
                    }); 
                }).catch((err:any) => {
                    this.setState({loading:false});
                    console.log("ERR", err)
                });

                break;
            case "findPersonalArtworks":
                let token = JSON.parse(localStorage.getItem('jwtToken') || '{}');
                //Not authorised            
                if(helpers.isEmpty(token)){
                    return false;
                }
                
                this.service.findPersonalArtWorks(token).then((res:any) =>{
                
                    this.setState({
                        artworks: res,
                        loading:false
                    });
                    
                }).catch( (err:any) =>{
                    this.setState({loading:false});
                    console.log("err", err);
                });
                break;
            default:
                const err = "no method specified";
                console.log(err);
            
                break;
        }
    }

    artworks = () => {

        let artworks = <p>There's nothing to show yet</p>
        if(this.state.artworks) {
            artworks = this.state.artworks.map((artwork:any, i:number) => {
                return(
                    <CardConstructor key={i} artwork={artwork}/>
                );
            })
        }
        return(
            <div>
                <div className={artworkStyles.artworks}>
                    {artworks}
                </div>
            </div>
        );
    }
    
    render(){
        let artworks = this.artworks();
        return(
            <div>
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

                {artworks}
              
            </div>
        );
    }
}


export default FindArtwork;