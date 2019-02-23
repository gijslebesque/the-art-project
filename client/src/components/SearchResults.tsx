import React, {Component} from 'react';
import Loader from 'react-loader-spinner';
import styles from '../styles/navbar.module.scss';
import history from '../history';


interface IProps {
    searchResults:any;
    showSearchResultContainer:any;
}

interface IState {
    loading:boolean;
   
}

export default class SearchResults extends Component <IProps, IState>{
    constructor(props:any){
        super(props);
        this.state = {
            loading:false,
      
        }
    }

    render() {

        //Think of better way, two db queries is to much
        let results
        if(this.props.searchResults){
            results = this.props.searchResults.map( (artwork:any, i:number) => {
            return <p key={i} onClick={(e:any) => {
                history.push(`artwork?id=${artwork._id}`)
                this.props.showSearchResultContainer(e, false)
            }
            }>{artwork.artworkName} by {artwork.author.username}</p>
     });
        }
        console.log("gi", results)
        return(
            <div className={styles.searchResultsContainer}>
               {this.state.loading && <Loader />}
            
                <div className={styles.btnRow}>
                    <button className={styles.btn} >Artists</button>
                    <button>Artwork</button>
                </div>
                <div className={styles.searchResults}>
                {results}
                </div>
            </div>
        );
    }
} 