const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Artwork = require("../models/Artwork");
const parser = require("../config/cloudinary");

router.post(
	"/photo-upload",
	passport.authenticate("jwt", { session: false }),
	parser.single("picture"),
	(req, res, next) => {
		const { artworkName, artworkDescription, artworkPrice } = req.body;

		const endDate = new Date(req.body.endDate);

		const newArtwork = new Artwork({
			artworkName,
			author: req.user._id,
			artworkURL: req.file.url,
			artworkDescription,
			auction: {
				originalPrice: parseInt(artworkPrice),
				endDate: endDate
			}
		});
		Artwork.create(newArtwork)
			.then(savedArtwork => {
				User.findOneAndUpdate(
					{ _id: req.user._id },
					{ $push: { artworks: newArtwork._id } }
				).then(updatedUser => {
					res.status(200).json({
						success: true,
						savedArtwork: newArtwork
					});
				});
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
);

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
