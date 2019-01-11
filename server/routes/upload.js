const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const User = require('../models/User');

const parser = require('../config/cloudinary');

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'


router.post('/photo-upload', parser.single('picture'), (req, res, next) => {
	
	if(!req.session.passport.user){
		res.status(403).json("You must be logged in to upload a photo");
		return;
	}
	const {artworkName, artworkDescription, artworkPrice} = req.body;
	
	const newArtwork = new Artwork({
		artworkName:artworkName,
  		author: req.session.passport.user,
		artworkURL: req.file.url,
		artworkDescription: artworkDescription,
 		bidAmount: artworkPrice
	});
	
	Artwork.create(newArtwork, (err, savedArtwork) => {
		if(err) res.status(500).json("You must be logged in to upload a photo");
		User.findOneAndUpdate({_id: req.session.passport.user}, { $push:{artworks: savedArtwork._id} }, (err, updatedUser) =>{
			if(err) res.status(500).json("You must be logged in to upload a photo");
			debugger;
			res.status(200).json({
				success: true,
				pictureUrl: req.file.url
			  });
		});
	});
})

module.exports = router;
