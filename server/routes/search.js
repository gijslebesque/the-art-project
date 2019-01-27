const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const passport   = require('passport');

/* GET users listing. */
router.get('/findRecentArtworks', function(req, res, next) {
	Artwork.find({}, null, {skip:0, limit:10, sort: {date: -1}})
	.populate('author', 'username favourite')
	.exec((err, result) => {
		if(err) throw err;
		res.status(200).json(result);
	});
});

router.get('/findPersonalArtworks', passport.authenticate('jwt', {session: false}), (req, res, next) =>{

	console.log("JWT user", req.user)
	Artwork.find({author: req.user._id}, null, {skip:0, limit:10, sort: {date: -1}})
	.populate('author', 'username favourite')
	.exec((err, result) => {
		if(err) throw err;
		console.log(result);
		res.status(200).json(result)
	});
});

module.exports = router;
