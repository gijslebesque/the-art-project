import React, {Component} from 'react';
import AuthService from './authenticate.js';
import Loader from './Loader.jsx';

class FindArtwork extends Component {
    constructor(props){
        super(props)
        this.state = {
            artworks:[],
            loading:true
        }
        this.service = new AuthService();
    }
    componentDidMount() {
        switch(this.props.method) {
            case "findRecentArtworks":
                this.service.findRecentArtWorks(res =>{
                    console.log(res)
                })  

              break;
            default:
                const err = "no method specified"
                throw err
              // code block
          }
    }
    render(){
        return(
            <div>
                    {this.state.loading && <Loader />}
            </div>
        )
    }

}


export default FindArtwork;