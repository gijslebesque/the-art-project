const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const User = require('../models/User');

const parser = require('../config/cloudinary');

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'


router.post('/photo-upload', parser.single('picture'), (req, res, next) => {
	debugger;
	

	if(!req.session.passport.user){
		res.status(403).json("You must be logged in to upload a photo")
		return;
	}
	const {artworkName, artworkDescription, artworkPrice} = req.body;
	
	const newArtwork = new Artwork({
		artworkName:artworkName,
  		author: req.session.user,
		artworkURL: req.file.url,
		artworkDescription: artworkDescription,
 		bidAmount: artworkPrice,
	});
	
	console.log(req.file.url)

	Artwork.create(newArtwork, (savedArtwork) => {
		return savedArtwork;
		}).then((savedArtwork)=>{
		User.findOneAndUpdate({_id: req.session.passport.user}, { $push:{artworks: savedArtwork._id} }, () =>{
			debugger;
			res.json({
				success: true,
				pictureUrl: req.file.url
			  })
		})
	})
	.catch(err => {
		debugger;
		res.status(500).json("Something went wrong");
	})
})

module.exports = router;
