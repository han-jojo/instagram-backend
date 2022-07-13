import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const typeFiles = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const resolverFiles = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);

const typeDefs = mergeTypeDefs(typeFiles);
const resolvers = mergeResolvers(resolverFiles);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
