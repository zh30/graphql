const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello zhanghe"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => console.log(`Graphql server at ${url}`));
