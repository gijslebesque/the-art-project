const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const passport   = require('passport');
const User = require('../models/User');

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
	Artwork.find({author: req.user._id}, null, {skip:0, limit:10, sort: {date: 1}})
	.populate('author', 'username favourite')
	.exec((err, result) => {
		if(err) throw err;
		console.log("RES", result);
		res.status(200).json(result)
	});
});

router.get('/findSpecificArtwork', (req, res, next) => {
	Artwork.findById(req.query.id)
	.populate('author', 'username favourite')
	.exec((err, result) => {
		if(err) throw err;
		console.log("RES", result);
		res.status(200).json(result)
	});
});

router.get('/findArtworkByName', (req, res, next) => {
	let query = {artworkName: {$regex : `.*${req.query.artworkName}.*`, $options:"-i"}}
	Artwork.find(query)
	.populate('author', 'username favourite')
	.exec((err, result) => {
		if(err) throw err;
		res.status(200).json(result)
	});
});


//Make search case insentive

router.get('/findArtistByName', (req, res, next) => {
	let query = {username: {$regex : `.*${req.query.username}.*`, $options:"-i"}}
	User.find(query).then(result => {
		console.log("res", result)
		res.status(200).json(result)
	}).catch( err =>{
		res.status(500).json(err);
	});
});

router.get("/findArtist" , (req, res, next) => {
	User.findById(req.query.id).populate('artworks').exec((err, result) =>{
		if(err) {
			res.status(500).json(err);
			throw err;
		}

		res.status(200).json(result);
		
	})
});


module.exports = router;
