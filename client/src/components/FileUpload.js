import React, {Component} from 'react';
import Button from './Button';
import AuthService from '..//authenticate.js';
import Modal from 'react-responsive-modal';
import Loader from 'react-loader-spinner';
import {spinnerCenterOverlay} from '../styles/spinner.module.scss';


class FileUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
			file: null,
			loading:false,
			modalHeader:"Upload your art",
			fileDescription: {
				artworkName: "",
				artworkDescription: "",
				artworkPrice: "",
				endDate: this.getDate()
			}
		}
		this.service = new AuthService()
	}
	
	handleFile = (e) => {
		this.setState({
		  file: e.target.files[0]
		});
	}

	handleChange = e => {
		const {name, value} = e.target;
        this.setState(prevState => ({
        	fileDescription: {
            	...prevState.fileDescription,
            	[name]: value
          	}
      	}));
	}
    
    handleSubmit = (e) =>{
		e.preventDefault();
		let token = JSON.parse(localStorage.getItem('jwtToken'));
		this.setState({loading:true});
		this.service.upload(this.state.file, this.state.fileDescription, token).then(res => {
			if(res){
				console.log(res);
				this.setState({
					modalHeader: "Succes! Upload another artwork?",
					loading:false
				})
			}
		}).catch(err => {
			this.setState({
				modalHeader:"Something went wrong! Please try again",
				loading:false
			})
		});
	}

	getDate = () => {

		let dtToday = new Date();
		let month = dtToday.getMonth() + 1;
		let day = dtToday.getDate();
		let year = dtToday.getFullYear();
	
		if(month < 10) {
			month = `0${month.toString()}`;
		}
		if(day < 10) {
			day = `0${day.toString()}`;
		}

		return `${year}-${month}-${day}`; 
	}
	
    render(){
	
		console.log(this.state)
        return (
			<Modal open={this.props.isOpen} onClose={ e =>{this.props.toggleUploadModal(false)}}>
				<h3>{this.state.modalHeader}</h3>
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<input type="text" name="artworkName" placeholder="Name of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.name}/>
					<input type="text" name="artworkDescription" placeholder="Description of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.description}/>
					<input type="number" name="artworkPrice" placeholder="Price of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.price}/>
					<input type="file" onChange={(e)=>this.handleFile(e)} /> <br/>
					<input type="date" name="endDate" min={this.getDate()}placeholder="Date" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.endDate}/>
					<Button type="submit" text="Upload artwork" />
				
				</form>
			{this.state.loading &&  
				<div className={spinnerCenterOverlay}>    
                    <Loader 
                    	type="Triangle"
                        color="#b0e0e6"
                        height="50"	
                        width="50"
                    /> 
					<p>Uploading...</p>
				</div>}

		</Modal>
        );
    }
}

export default FileUpload;