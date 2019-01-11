const { ApolloServer, gql, PubSub } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    user: [User]!
    book: Book!
  }

  type User {
    id: ID!
    username: String!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    firstLetterOfTitle: String!
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
    books(title: String!, author: String, id: ID): Books!
    login(userinfo: UserInfo!): String!
  }

  type Subscription {
    newBook: Book!
  }
`;

const NEW_BOOK = "NEW_BOOK";

const resolvers = {
  Subscription: {
    newBook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_BOOK)
    }
  },

  Book: {
    firstLetterOfTitle: parent => {
      return parent.title[0].toLowerCase();
    }
    // title: parent => {
    //   console.log(parent);
    //   return parent.title;
    // }
  },
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
    ],
    book: () => ({
      id: 2,
      title: "huahuahuahuade"
    })
  },
  Mutation: {
    books: (_, { title, author }, { pubsub }) => {
      const book = {
        id: 2,
        title,
        author
      };
      pubsub.publish(NEW_BOOK, {
        newBook: book
      });
      return {
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
      };
    },
    login: (parent, { userinfo: { username } }, context, info) => {
      console.log(context);
      return username;
    }
  }
};

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub })
});

server.listen().then(({ url }) => console.log(`Graphql server at ${url}`));
