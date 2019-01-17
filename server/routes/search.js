const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');


/* GET users listing. */
router.get('/findRecentArtworks', function(req, res, next) {
	Artwork.find({}, null, {skip:0, limit:10, sort: {date: -1}})
	.populate('author', 'username favourite', )
	.exec((err, result) => {
		if(err) throw err;
		console.log(result);
		res.status(200).json(result)
	});
});

module.exports = router;
