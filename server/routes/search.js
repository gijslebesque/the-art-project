const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');


/* GET users listing. */
router.get('/findRecentArtworks', function(req, res, next) {
	Artwork.find({},
	{
		skip:0, // Starting Row
		limit:10, // Ending Row
		sort:{
			date_added: -1 //Sort by Date Added DESC
		}
	},
	(recentArtworks) => {
		res.status(200).json(recentArtworks);
	}).catch(err => {
		res.status(500).json("Something went wrong");
	});
});

module.exports = router;
