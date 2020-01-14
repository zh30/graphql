import "reflect-metadata";
import Express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import UserResolver from "./graphql/resolvers/UserResolver";
import { COOKIE_SECRET } from './config';

(async () => {
  const app = Express();
  app.use(cookieParser(COOKIE_SECRET));
  app.get("/", (req, res) => {
    res.send(req.signedCookies);
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
