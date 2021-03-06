import User from "../../../models/User";

export default {
	user: async (root, args) => {
		try {
			console.log("hello");
			debugger;
			const result = await User.findOne(args)
				.populate({ path: "artworks", populate: { path: "auction.bidder" } })
				.exec();
			return result;
		} catch (err) {
			return err;
		}
	},

	users: async (root, args, context) => {
		debugger;
		try {
			let query = {
				username: { $regex: `.*${args.username}.*`, $options: "-i" }
			};
			const result = await User.find(query)
				.populate("artworks")
				.exec();
			console.log(result);
			return result;
		} catch (err) {
			return err;
		}

		// console.log("HEllo");
		// return new Promise((resolve, reject) => {
		// 	User.find(query)
		// 		.populate("artworks")
		// 		.exec((err, res) => {
		// 			err ? reject(err) : resolve(res);
		// 		});
		// });
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
