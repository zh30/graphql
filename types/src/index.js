const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    user: [User]!
  }

  type User {
    id: ID!
    username: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type Books {
    errors: [Error!]!
    book: Book!
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    books(title: String!, Author: String, id: ID): Books!
    login(userinfo: UserInfo!): String!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, { name }, context, info) => {
      return `你好，最最辛苦的${name}!`;
    },
    user: () => [
      {
        username: "zhanghe",
        id: "23413123"
      },
      {
        username: "zhanghe",
        id: "23413133"
      }
    ]
  },
  Mutation: {
    books: () => ({
      errors: [
        {
          field: "username",
          message: "ops!!!"
        },
        {
          field: "username",
          message: "ops!!!"
        }
      ],
      book: {
        id: 1,
        title: "yes!!!",
        author: "zhanghe"
      }
    }),
    login: (parent, { userinfo: { username } }, context, info) => {
      console.log(context);
      return username;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

server.listen().then(({ url }) => console.log(`Graphql server at ${url}`));
