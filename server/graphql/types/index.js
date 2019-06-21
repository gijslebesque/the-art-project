import { gql } from "apollo-server-express";

import userSchema from "./User/";
import artworkSchema from "./Artwork/";

const linkSchema = gql`
	type Query {
		_: Boolean
	}
	type Mutation {
		_: Boolean
	}
`;

//   type Subscription {
//     _: Boolean
//   }

export default [linkSchema, userSchema, artworkSchema];
