import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import FindArtwork from './FindArtwork';


class Profile extends Component  {
    constructor(props){
        super(props)
        this.state = {
            user: {
                username:props.username,
            },
            showArtworks:false,
            btnText: "Show my work"
        }
        this.service = new AuthService();
    }
  
    componentDidMount(){
    //    this.service()

        console.log("rendered")
    }
    showPersonalArtworks = e => {
       this.setState({
        showArtworks: !this.state.showArtworks,
        btnText: "Hide my work"
       });
    }
    render() {
        return(
            <div className="profile">
                <h1>Hello <br/>{this.state.user.username}</h1>
                <h2>Pending bids</h2>
                <h2>Your works</h2>
                <button className="btnPrimary" onClick={e => {this.showPersonalArtworks(e)}}>{this.state.btnText}</button>
                {this.state.showArtworks && <FindArtwork method="findPersonalArtworks"/> }
        
            
            </div>    
        )
    }
}

export default Profile;