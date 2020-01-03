import "reflect-metadata";
import { createConnection } from "typeorm";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
// import ProjectResolver from "./graphql/resolvers/ProjectResolver";
// import TaskResolver from "./graphql/resolvers/TaskResolver";
import { User } from "./data/entity/User";
import RegisterResolver from "./graphql/resolvers/RegisterResolver";

const main = async () => {
  const app = Express();
  const connection = await createConnection();
  console.info("connection: ", connection.isConnected);
  // if (connection.isConnected) {
  //   console.log("Inserting a new user into the database...");
  //   const user = new User();
  //   user.firstName = "He";
  //   user.lastName = "Zhang";
  //   user.age = 28;
  //   user.email = "zhanghe@zhanghe.cool"
  //   const userRepository = connection.getRepository(User);
  //   await userRepository.save(user);
  //   console.log("Saved a new user with id: " + user.id);

  //   console.log("Loading users from the database...");
  //   const users = await userRepository.find();
  //   console.log("Loaded all users: ", users);
  // }
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
