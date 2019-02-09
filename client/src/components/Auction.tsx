import React, {Component} from 'react';

export default class Auction extends Component<any, any> {
    
    constructor(props:any){
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
