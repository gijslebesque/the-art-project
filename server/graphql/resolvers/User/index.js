import User from "../../../models/User";

export default {
	user: (root, args) => {
		return new Promise((resolve, reject) => {
			User.findOne(args)
				.populate({ path: "artworks", populate: { path: "auction.bidder" } })
				.exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
		});
	},
	users: (root, args, context) => {
		debugger;
		return new Promise((resolve, reject) => {
			User.find({})
				.populate()
				.exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
		});
	},

	userByName: (root, args, context) => {
		let query = {
			username: { $regex: `.*${args.username}.*`, $options: "-i" }
		};

		return new Promise((resolve, reject) => {
			User.find(query)
				.populate()
				.exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
		});
	}

	// Mutation: {
	//   addUser: (root, { id, username, email }) => {
	//     const newUser = new User({ id, username, email });

	//     return new Promise((resolve, reject) => {
	//       newUser.save((err, res) => {
	//         err ? reject(err) : resolve(res);
	//       });
	//     });
	//   },
	//   editUser: (root, { id, username, email }) => {
	//     return new Promise((resolve, reject) => {
	//       User.findOneAndUpdate({ id }, { $set: { username, email } }).exec(
	//         (err, res) => {
	//           err ? reject(err) : resolve(res);
	//         }
	//       );
	//     });
	//   },
	//   deleteUser: (root, args) => {
	//     return new Promise((resolve, reject) => {
	//       User.findOneAndRemove(args).exec((err, res) => {
	//         err ? reject(err) : resolve(res);
	//       });
	//     });
	//   }
	// }
};
