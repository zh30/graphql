const {
  ApolloServer,
  gql
} = require('apollo-server');

const typeDefs = gql `
  type Query {
    hello: Int!
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
    errors: [Error]
    book: Book!
  }

  type Mutation {
    books: Books!
  }
`;

const resolvers = {
  Query: {
    hello: () => 5
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