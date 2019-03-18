import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Artwork from './Artwork/';
const typeDefs = [User, Artwork];

export default mergeTypes(typeDefs, { all: true });