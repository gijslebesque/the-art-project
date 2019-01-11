import React, {Component} from 'react';
import Button from './Button';
import AuthService from '..//authenticate.js';
import Modal from 'react-responsive-modal';

class FileUpload extends Component {
    constructor(props){
        super(props)
        this.state = {
			file: null,
			fileDescription: {
				artworkName: "",
				artworkDescription: "",
				artworkPrice: ""
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
		e.preventDefault()
		this.service.upload(this.state.file, this.state.fileDescription)
	}
	
    render(){
        return (
			<Modal open={this.props.isOpen} onClose={ e =>{this.props.toggleUploadModal(false)}}>
			<h3>Upload your art</h3>
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<input type="text" name="artworkName" placeholder="Name of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.name}/>
					<input type="text" name="artworkDescription" placeholder="Description of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.description}/>
					<input type="number" name="artworkPrice" placeholder="Price of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.price}/>
			<input type="file" onChange={(e)=>this.handleFile(e)} /> <br/>
			<Button type="submit" text="Upload artwork" />
			
			</form>
		</Modal>
        );
    }
}

export default FileUpload;