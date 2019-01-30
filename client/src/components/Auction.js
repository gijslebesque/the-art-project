import React, {Component} from 'react';

class Auction extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            user: null
        }
    }

    componentWillMount(){
        let user = localStorage.getItem('user');
        this.setState({user:user});
    }

    render() {
        return (
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
        );
    }
}

export default Auction;