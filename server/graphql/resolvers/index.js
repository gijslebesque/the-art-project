import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Artwork from "./Artwork/"

const resolvers = [User, Artwork];

export default mergeResolvers(resolvers);