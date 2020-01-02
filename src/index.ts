import "reflect-metadata";
import { createConnection } from "typeorm";
import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import ProjectResolver from "./resolvers/ProjectResolver";
import TaskResolver from "./resolvers/TaskResolver";
import { User } from "./entity/User";

const bootstrap = async () => {
  // const schema = await buildSchema({
  //   resolvers: [ProjectResolver, TaskResolver],
  //   emitSchemaFile: true
  // });

  // const server = new ApolloServer({
  //   schema,
  //   playground: true
  // });

  const app = new Koa();
  // server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.info(
      `🚀 Server ready at http://localhost:4000`
      // `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    )
  );
};

bootstrap();
// createConnection()
//   .then(async connection => {
//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "He";
//     user.lastName = "Zhang";
//     user.age = 28;
//     const userRepository = connection.getRepository(User);
//     await userRepository.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await userRepository.find();
//     console.log("Loaded all users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch(error => console.log(error));
