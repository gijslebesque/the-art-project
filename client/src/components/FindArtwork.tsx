import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import styles from '../styles/spinner.module.scss';
import CardConstructor from './CardConstructor';
import  helpers from '../helpers';

interface IState {
    artworks:any;
    styles:any;
    loading:boolean;
} 

class FindArtwork extends Component <any, IState> {
    service:any;
   
    constructor(props:any){
        super(props)
        this.state = {
            artworks:null,
            styles:styles,
            loading:true
        }
        this.service = new AuthService();
    }

    componentDidMount() {
        switch(this.props.method) {
            case "findRecentArtworks":
                this.service.findRecentArtWorks().then((res:any) =>{
                 
                    if(res) {
                        this.setState({
                            artworks: res,
                            loading:false
                        });
                    } 
                });
            break;
            case "findPersonalArtworks":
                let token = JSON.parse(localStorage.getItem('jwtToken') || '{}');
                //Not authorised            
                if(helpers.isEmpty(token)){
                    return false;
                }
                
                this.service.findPersonalArtWorks(token).then((res:any) =>{
                    if(res) {
                        this.setState({
                            artworks: res,
                        });
                    } 
                });
            break;
            default:
                
                const err = "no method specified" ;
                console.log(err);
            
                break;
        }
    }

    Artworks = () => {

        let artworks = <p>There's nothing to show yet</p>
        console.log(this.state.artworks)
        if(this.state.artworks) {
            artworks = this.state.artworks.map((artwork:any, i:number) => {
                return(
                    <CardConstructor key={i} artwork={artwork}/>
                )
            })
        }
        return(
            <div>
                <div className="artworks">
                    {artworks}
                </div>
            </div>
            
        );
    }
    
    render(){
        let artworks = this.Artworks();
        return(
            <div>
                {this.state.loading && 

                <div className={styles.spinnerCenter}>    
               
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
        )
    }

}


export default FindArtwork;