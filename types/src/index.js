const {
  ApolloServer,
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    hello: String!
    user: User!
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
    login(userinfo: UserInfo!): Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
    user: () => ({
      username: 'zhanghe',
      id: '23413123'
    })
  },
  Mutation: {
    books: () => ({
      errors: [{
          field: 'username',
          message: 'ops!!!'
        },
        {
          field: 'username',
          message: 'ops!!!'
        },
      ],
      book: {
        id: 1,
        title: 'yes!!!',
        author: 'zhanghe'
      }
    })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({
  url
}) => console.log(`Graphql server at ${url}`))