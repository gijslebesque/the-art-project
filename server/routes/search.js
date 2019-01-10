const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');


/* GET users listing. */
router.get('/findRecentArtworks', function(req, res, next) {
	debugger

	Artwork.find({}, null, {skip:0, limit:10, sort: {date: -1}})
	.then(artworks =>{
		res.status(200).json(artworks)
		debugger;
	}).catch(err => {
		res.status(500).json("Something went wrong");
		debugger;
	})
	
	//  Artwork.find({}).sort({'createdAt': 'desc'}).exec(docs => { 
		
	// 	console.log(docs)
	// 	debugger;
	// 	res.status(200).json(docs);
	//  }).catch(err =>{
	// 	console.log(err)
	// 	 	debugger;
	// 	 	res.status(500).json("Something went wrong");
	//  })
	//   }).catch(err => {
	// 	console.log(err)
	// 	debugger;
	// 	res.status(500).json("Something went wrong");
	// });
	// Artwork.find(
	// {
	// 	skip:0, // Starting Row
	// 	limit:10, // Ending Row
	// 	sort:{
	// 		created_at: -1 //Sort by Date Added DESC
	// 	}
	// },
	// (recentArtworks) => {
	// 	debugger;
	// 	res.status(200).json(recentArtworks);
	// }).catch(err => {
	// 	console.log(err)
	// 	debugger;
	// 	res.status(500).json("Something went wrong");
	// });
});

module.exports = router;
