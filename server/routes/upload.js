const express 	= require('express');
const router	= express.Router();
const passport 	= require('passport');
const User 		= require('../models/User');
const Artwork 	= require('../models/Artwork');
const parser 	= require('../config/cloudinary');


router.post('/photo-upload', passport.authenticate('jwt', {session: false}), parser.single('picture'), (req, res, next) => {
	
	const {artworkName, artworkDescription, artworkPrice} = req.body;

	let endDate = new Date(req.body.endDate);
	
	const newArtwork = new Artwork({
		artworkName:artworkName,
  		author: req.user._id,
		artworkURL: req.file.url,
		artworkDescription: artworkDescription,
		auction: {
			originalPrice: artworkPrice,
			endDate: endDate,
		},
	});
	
	Artwork.create(newArtwork, (err, savedArtwork) => {
		if(err) throw err;
		User.findOneAndUpdate({_id: req.user._id}, { $push:{artworks: savedArtwork._id} }, (err, updatedUser) =>{
			if(err) throw err;
			debugger;
			res.status(200).json({
				success: true,
				savedArtwork: savedArtwork
			});
		});
	});
})

module.exports = router;



/*

function greatestProduct(arr){
  let allProducts = [];

  for(let j = 0; j<arr.length; j++){
    for(let i = 0; i<arr[j].length-3; i++){
      allProducts.push(arr[j][i] * arr[j][i+1] * arr[j][i+2] * arr[j][i+3])
    }
  } 

  for(let h = 0; h<arr.length; h++){
    for(let i = 0; i<arr[h].length-3; i++){
      allProducts.push(arr[i][h] * arr[i+1][h] * arr[i+2][h] * arr[i+3][h])
    }
  }

return( Math.max(...allProducts) )
}


*/