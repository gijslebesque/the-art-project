import React, {Component} from 'react';
import Button from './Button';
import AuthService from '../authenticate.js';
import Modal from 'react-responsive-modal';
import Loader from 'react-loader-spinner';
import styles from '../styles/spinner.module.scss';

interface IProps {
	isOpen:boolean;
	toggleUploadModal:any;	
}

interface IState {
	file: any;
	loading:boolean;
	modalHeader:string;
	styles:any;
	fileDescription: {
		artworkName: string,
		artworkDescription: string,
		artworkPrice: number,
		endDate: string,
	}
}


class FileUpload extends Component <IProps, IState> {
	service:any
    constructor(props:any){
        super(props)
        this.state = {
			file: null,
			loading:false,
			modalHeader:"Upload your art",
			styles:styles,
			fileDescription: {
				artworkName: "",
				artworkDescription: "",
				artworkPrice: 0,
				endDate: this.getDate()
			}
		}
		this.service = new AuthService()
	}
	
	handleFile = (e:any) => {
		this.setState({
		  file: e.target.files[0]
		});
	}

	handleChange = (e:any) => {
		const {name, value} = e.target;
        this.setState(prevState => ({
        	fileDescription: {
            	...prevState.fileDescription,
            	[name]: value
          	}
      	}));
	}
    
    handleSubmit = (e:any) =>{
		e.preventDefault();
		let token = JSON.parse(localStorage.getItem('jwtToken') ||'{}');
		this.setState({loading:true});
		this.service.upload(this.state.file, this.state.fileDescription, token).then((res: any) => {
			if(res){
				console.log(res);
				this.setState({
					modalHeader: "Succes! Upload another artwork?",
					loading:false
				})
			}
		}).catch((err:any) => {
			this.setState({
				modalHeader:"Something went wrong! Please try again",
				loading:false
			})
		});
	}
	//Set minum date as expiration date to now. 
	getDate = () => {

		let dtToday:Date = new Date();
		let month:number = dtToday.getMonth() + 1;
		let day:number = dtToday.getDate();
		let year = dtToday.getFullYear();
	
		if(month < 10) {
			month = Number(`0${month.toString()}`);
		}
		if(day < 10) {
			day = Number(`0${day.toString()}`);
		}

		return `${year}-${month}-${day}`; 
	}
	
    render(){
	
        return (
			<Modal open={this.props.isOpen} onClose={ () =>{this.props.toggleUploadModal(false)}}>
				<h3>{this.state.modalHeader}</h3>
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<input type="text" name="artworkName" placeholder="Name of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.artworkName}/>
					<input type="text" name="artworkDescription" placeholder="Description of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.artworkDescription}/>
					<input type="number" name="artworkPrice" placeholder="Price of your work" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.artworkPrice}/>
					<input type="file" onChange={(e)=>this.handleFile(e)} /> <br/>
					<input type="date" name="endDate" min={this.getDate()}placeholder="Date" onChange={(e)=>this.handleChange(e)} value={this.state.fileDescription.endDate}/>
					<Button type="submit" text="Upload artwork" />
				
				</form>
			{this.state.loading &&  
				<div className={styles.spinnerCenterOverlay}>    
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