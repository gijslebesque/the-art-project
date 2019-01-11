const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');


/* GET users listing. */
router.get('/findRecentArtworks', function(req, res, next) {
	

	Artwork.find({}, null, {skip:0, limit:10, sort: {date: -1}})
	.then(artworks =>{
		res.status(200).json(artworks)
		debugger;
	}).catch(err => {
		res.status(500).json("Something went wrong");
		debugger;
	})
	
	// Artwork.
	// find({}, null).
	// populate('user'). 
	// exec(function (err, artwork) {
	//   if (err) throw err;
  
	//   console.log('The author is %s', artwork);
	//   // prints "The author is Ian Fleming"
  
	//  debugger;
	//   // prints "The authors age is null'
	// });

});

module.exports = router;
