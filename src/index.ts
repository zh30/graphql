import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import UserResolver from "./graphql/resolvers/UserResolver";
import cookieParser from "cookie-parser";

(async () => {
  const app = Express();
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.send(req.cookies);
  });
  const connection = await createConnection();
  console.info("connection: ", connection.isConnected);
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    playground: true
  });

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.info(`🚀 Server ready at http://localhost:4000/graphql`)
  );
})();
