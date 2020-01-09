import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import RegisterResolver from "./graphql/resolvers/Register/RegisterResolver";

const main = async () => {
  const app = Express();
  const connection = await createConnection();
  console.info("connection: ", connection.isConnected);
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    playground: true
  });

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.info(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

main();
