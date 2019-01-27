import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import FindArtwork from './FindArtwork';


class Profile extends Component  {
    constructor(props){
        super(props)
        this.state = {
            user: {
                username:props.username
            }
        }
        this.service = new AuthService();
    }
  
    componentDidMount(){
    //    this.service()

        console.log("rendered")
    }

    render() {
        return(
            <div className="profile">
                <h1>Hello <br/>{this.state.user.username}</h1>
                <FindArtwork method="findPersonalArtworks"/> 
                <h2>Pending bids</h2>
            </div>    
        )
    }
}

export default Profile;