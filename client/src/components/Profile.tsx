import React, {Component} from 'react';
import AuthService from '../authenticate.js';
import FindArtwork from './FindArtwork';


export default class Profile extends Component<any, any>  {
    service:any;
    constructor(props:any){
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

        console.log("proppass", this.props)
    }
    showPersonalArtworks = () => {
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
                <button className="btnPrimary" onClick={e => {this.showPersonalArtworks()}}>{this.state.btnText}</button>
                {this.state.showArtworks && <FindArtwork method="findPersonalArtworks"/> }
        
            
            </div>    
        )
    }
}

