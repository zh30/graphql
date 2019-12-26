const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`;
const resolvers = {
  Query: {
    totalPhotos: () => 28
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.info("Graphql Server running on: ", url));
