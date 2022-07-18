import "dotenv/config";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const PORT = process.env.PORT;

const startServer = async () => {
  const app = express();
  app.use(logger("dev"));
  app.use(graphqlUploadExpress());
  app.use("/images", express.static("uploads"));

  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectedResolver,
      };
    },
  });

  await apollo.start();
  apollo.applyMiddleware({ app });
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀Server is running on http://localhost:${PORT}${apollo.graphqlPath} ✅`
  );
};

startServer();
