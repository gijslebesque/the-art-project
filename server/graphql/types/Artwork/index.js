export default `
    type Auction {
        bidder: User,
        originalPrice: String,
        endDate: String,
        bid: String,   
    }

  type Artwork {
    _id: String
    artworkName: String
    artworkURL: String
    artworkDescription: String
    favouritised: [User]
    following: [User]
    auction: Auction
  }
  type Query {
    artwork(_id: String!): Artwork
    artworks: [Artwork]
  }
  type Mutation {
    addArtwork(id: String!, artworkName: String!, email: String!): Artwork
    editArtwork(id: String, artworkName: String, email: String): Artwork
    deleteArtwork(id: String, artworkName: String, email: String): Artwork
  }
`;