import Artwork from "../../../models/Artwork";

export default {
	artwork: (root, args) => {
		return new Promise((resolve, reject) => {
			Artwork.findOne(args)
				.populate("author")
				.populate("auction.bidder")
				.exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
		});
	},
	artworks: (root, args) => {
		let query = {
			artworkName: { $regex: `.*${args.artworkName}.*`, $options: "-i" }
		};
		return new Promise((resolve, reject) => {
			Artwork.find(query)
				.populate("author")
				.exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
		});
	}

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
