import React, { Component } from 'react';
import '../styles/hero.scss';
import FindArtwork from './FindArtwork';


export default class Home extends Component {
	render() {
    	return (
    		<div className="Home">
        		<div className="hero">
        			<h1>The <br/>Art <br/> Project</h1>
    			</div> 
				<h2>Recent artworks</h2>
				<FindArtwork method="findRecentArtworks"/> 
			
    		</div>
      	);
    }
}
  