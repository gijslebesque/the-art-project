import React, {Component} from 'react';


class Profile extends Component  {
    constructor(props){
        super(props)
        this.state = {
            user: {
                username:props.username
            }
        }
    }
  
    componentDidMount(){
        console.log("rendered")
    }

    render() {
        return(
            <div className="profile">
                <h1>Hello <br/>{this.state.user.username}</h1>
                <h2>Your art</h2>
                <h2>Pending bids</h2>
            </div>    
        )
    }
}

export default Profile;