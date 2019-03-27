import User from "./User/";
import Artwork from "./Artwork/";

const resolvers = {
	Query: {
		...Artwork,
		...User
	}
};

export default resolvers;
