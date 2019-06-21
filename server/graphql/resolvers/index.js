import User from "./User/";
import Artwork from "./Artwork/";

const { artwork, artworks, makeBid } = Artwork;

const resolvers = {
	Query: {
		artwork,
		artworks,
		...User
	},
	Mutation: {
		makeBid
	}
};

export default resolvers;
