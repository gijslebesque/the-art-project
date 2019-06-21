import Artwork from "../../../models/Artwork";

export default {
	artwork: async (root, args) => {
		try {
			debugger;
			const result = await Artwork.findOne(args)
				.populate("author")
				.populate("auction.bidder")
				.exec();
			return result;
		} catch (err) {
			return err;
		}

		// return new Promise((resolve, reject) => {
		// 	Artwork.findOne(args)
		// 		.populate("author")
		// 		.populate("auction.bidder")
		// 		.exec((err, res) => {
		// 			err ? reject(err) : resolve(res);
		// 		});
		// });
	},
	artworks: async (root, args) => {
		try {
			let query = {
				artworkName: { $regex: `.*${args.artworkName}.*`, $options: "-i" }
			};
			return await Artwork.find(query)
				.populate("author")
				.exec();
		} catch (err) {
			return err;
		}

		// let query = {
		// 	artworkName: { $regex: `.*${args.artworkName}.*`, $options: "-i" }
		// };
		// return new Promise((resolve, reject) => {
		// 	Artwork.find(query)
		// 		.populate("author")
		// 		.exec((err, res) => {
		// 			err ? reject(err) : resolve(res);
		// 		});
		// });
	},
	makeBid: async (root, args, context) => {
		console.log(context);
		debugger;
		try {
			const id = "5c5ef1d8652be426b422bcc9";
			return await Artwork.findByIdAndUpdate(
				args,
				{
					$set: { "auction.bid": args.bid, "auction.bidder": id }
				},
				{ new: true }
			).exec();
		} catch (err) {
			return err;
		}
	}

	// passport.authenticate("jwt", { session: false }),
	// (req, res, next) => {
	// 	const artworkId = req.body.data.id;
	// 	const userId = req.user._id;
	// 	const bidAmount = req.body.data.bidAmount;
	// 	Artwork.findByIdAndUpdate(artworkId, {
	// 		$set: { "auction.bid": bidAmount, "auction.bidder": userId }
	// 	})
	// 		.then(result => {
	// 			res.status(200).json(result);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			res.status(500).json("Couldn't update code");
	// 		});
	// }

	//   Mutation: {
	//     addArtwork: (root, { id, username, email }) => {
	//       const newUser = new User({ id, username, email });

	//       return new Promise((resolve, reject) => {
	//         newUser.save((err, res) => {
	//           err ? reject(err) : resolve(res);
	//         });
	//       });
	//     },
	//     editUser: (root, { id, username, email }) => {
	//       return new Promise((resolve, reject) => {
	//         User.findOneAndUpdate({ id }, { $set: { username, email } }).exec(
	//           (err, res) => {
	//             err ? reject(err) : resolve(res);
	//           }
	//         );
	//       });
	//     },
	//     deleteUser: (root, args) => {
	//       return new Promise((resolve, reject) => {
	//         User.findOneAndRemove(args).exec((err, res) => {
	//           err ? reject(err) : resolve(res);
	//         });
	//       });
	//     }
	//   }
};
