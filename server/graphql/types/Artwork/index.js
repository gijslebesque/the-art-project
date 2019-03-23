// var { buildSchema } = require('graphql');

// // Construct a schema, using GraphQL schema language
// const ArtworkSchema  = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);


// export default `
//     type Auction {
//         bidder: User,
//         originalPrice: String,
//         endDate: String,
//         bid: String,   
//     }

//   type Artwork {
//     _id: String
//     artworkName: String
//     artworkURL: String
//     artworkDescription: String
//     favouritised: [User]
//     following: [User]
//     auction: Auction
//   }
//   type Query {
//     artwork(_id: String!): Artwork
//     artworks: [Artwork]
//   }
//   type Mutation {
//     addArtwork(id: String!, artworkName: String!, email: String!): Artwork
//     editArtwork(id: String, artworkName: String, email: String): Artwork
//     deleteArtwork(id: String, artworkName: String, email: String): Artwork
//   }
// `;

// import { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server-express';


export default gql `
  extend type Query {
    artwork(_id: String!): Artwork
    artworks: [Artwork]
  }

  type Auction {
      bidder: User,
      originalPrice: Int,
      endDate: String,
      bid: Int,   
  }

  type Artwork {
    _id: String
    author: User
    artworkName: String
    artworkURL: String
    artworkDescription: String
    favouritised: [User]
    following: [User]
    auction: Auction
  }
`;
