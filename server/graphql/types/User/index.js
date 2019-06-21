// export default`
//   type User {
//     _id: String!
//     username: String
//     email: String
//     artworks: [Artwork]
//     favourite: [User!]
//     following: [User!]
//     followers: [User!]
//   }
//   type Query {
//     user(_id: String!): User
//     users: [User]
//   }
//   type Mutation {
//     addUser(id: String!, username: String!, email: String!): User
//     editUser(id: String, username: String, email: String): User
//     deleteUser(id: String, username: String, email: String): User
//   }
// `;

import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		user(_id: String, username: String): User
		users(username: String): [User]
	}

	type User {
		_id: String!
		username: String
		email: String
		artworks: [Artwork]
		favourite: [ID]
		following: [ID]
		followers: [ID]
	}
`;
