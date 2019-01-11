import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import Loader from 'react-loader-spinner';
import Arworks from './Artworks.jsx';
import {spinnerCenter} from '../styles/spinner.module.scss';


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
            console.log("hi")
                this.service.findRecentArtWorks().then(res =>{
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
    render(){
        console.log(this.state.artworks)
        return(
            <div>
                <h2>Recent artworks</h2>
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

                {this.state.artworks && <Arworks artworks={this.state.artworks}/>}
              
            </div>
        )
    }

}


export default FindArtwork;