const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const passport   = require('passport');
const User = require('../models/User');


router.put("/favourite", passport.authenticate('jwt', {session: false}) , (req, res, next) => {
	const artworkId = req.body.data.id;
	const userId = req.user._id;
	User.findByIdAndUpdate(userId, { $push: {"favourite": artworkId}}).then(result => {	
		res.status(200).json(result);
	}).catch(err => {
		res.status(500).json(err);
	});

});

router.put("/follow", passport.authenticate('jwt', {session: false}) , (req, res, next) => {
	const thisUser = req.user._id;
	const followingUser = req.body.data.authorId;
	debugger
	User.findByIdAndUpdate(thisUser, { $push: {"following": followingUser}}).then(result => {
		debugger;

		User.findByIdAndUpdate(followingUser, {$push :{"followers": thisUser }}).then((theotherres)=>{
			debugger;
			res.status(200).json(result);

		}).catch(err => {
			debugger
			throw err;
		})
	

	}).catch(err => {
		debugger;

		 console.log(err);
		res.status(500).json(err);
	})

});


router.put("/makeBid", passport.authenticate('jwt', {session: false}) , (req, res, next) => {
	const artworkId = req.body.data.id;
	const userId = req.user._id;
	const bidAmount = req.body.data.bidAmount;
	Artwork.findByIdAndUpdate(artworkId, { $set: {"auction.bid": bidAmount, "auction.bidder": userId}}).then(result => {
		res.status(200).json(result);
	}).catch(err => {
		res.status(500).json(err);
	})

});



module.exports = router;