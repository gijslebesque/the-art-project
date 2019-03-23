// import { mergeTypes } from "merge-graphql-schemas";

// import User from "./User/";
// import Artwork from './Artwork/';
// const typeDefs = [User, Artwork];

// export default mergeTypes(typeDefs, { all: true });

// import {
//     mergeSchemas, addMockFunctionsToSchema
//   } from 'graphql-tools';

import { gql } from 'apollo-server-express';

import userSchema from "./User/";
import artworkSchema from './Artwork/';

const linkSchema = gql `
  type Query {
    _: Boolean
  }
`;

// type Mutation {
//     _: Boolean
//   }

//   type Subscription {
//     _: Boolean
//   }

export default [linkSchema, userSchema, artworkSchema];


// export const schema = mergeSchemas({
//     schemas: [
//       User,
//       Artwork
//     ],
//   });
