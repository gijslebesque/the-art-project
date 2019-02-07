import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import {spinnerCenter} from '../styles/spinner.module.scss';
import CardConstructor from './CardConstructor';



class FindArtwork extends Component {
    constructor(props){
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
                this.service.findRecentArtWorks().then(res =>{
                 
                    if(res.status === 200) {
                        this.setState({
                            artworks: res.data,
                            loading:false
                        });
                    } 
                });
            break;
            case "findPersonalArtworks":
                let token = JSON.parse(localStorage.getItem('jwtToken'));
                this.service.findPersonalArtWorks(token).then(res =>{
                    if(res.status === 200) {
                        this.setState({
                            artworks: res.data,
                            loading:false
                        });
                    } 
                });
            break;
            default:
                const err = "no method specified";
                console.log(err)
                //throw err
                break;
        }
    }

    Artworks = () => {

        let artworks = <p>There's nothing to show yet</p>
        console.log(this.state.artworks)
        if(this.state.artworks) {
            artworks = this.state.artworks.map((artwork, i) => {
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
                <div className={spinnerCenter}>    
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