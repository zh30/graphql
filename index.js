const { GraphQLScalarType } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const express = require("express");
const app = express();
const typeDefs = `
  scalar DateTime
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
  }
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPotos: [Photo!]!
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String!
    category: PhotoCategory!
    postedBy: User!
    taggedUsers: [User!]!
    created: DateTime!
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]
  }
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;
let _id = 0;
let users = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" },
  { githubLogin: "gPlake", name: "Glen Plake" }
];
let tags = [
  { photoID: 1, userID: "gPlake" },
  { photoID: 2, userID: "sSchmidt" },
  { photoID: 2, userID: "mHattrup" },
  { photoID: 3, userID: "gPlake" }
];
let photos = [
  {
    id: 1,
    name: "fjlasdjfj",
    description: "jflasdjfjsdfjlaksdj",
    category: "ACTION",
    githubLogin: "gPlake",
    created: "3-28-1977"
  },
  {
    id: 2,
    name: "rgfsafsdaf",
    description: "cdsfsadbvdfvasfdv",
    category: "SELFIE",
    githubLogin: "sSchmidt",
    created: "1-2-1985"
  },
  {
    id: 3,
    name: "bhrgther4564",
    description: "sdfasdf142465nfghjnrth",
    category: "LANDSCAPE",
    githubLogin: "sSchmidt",
    created: "2018-04-15T19:09:57.308Z"
  }
];
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto(parent, { input }) {
      const newPhoto = {
        id: _id++,
        ...input,
        created: new Date()
      };
      photos.push(newPhoto);
      return newPhoto;
    }
  },
  Photo: {
    url: ({ id }) => `https://zhanghe.org/images/${id}.jpg`,
    postedBy: parent =>
      users.find(({ githubLogin }) => githubLogin === parent.githubLogin),
    taggedUsers: parent =>
      tags
        .filter(({ photoID }) => photoID === parent.id)
        .map(({ userID }) => userID)
        .map(userID => users.find(({ githubLogin }) => userID === githubLogin))
  },
  User: {
    postedPhotos: parent =>
      photos.filter(({ githubLogin }) => githubLogin === parent.githubLogin),
    inPotos: parent =>
      tags
        .filter(({ userID }) => userID === parent.id)
        .map(({ photoID }) => photoID)
        .map(photoID => photos.find(({ id }) => id === photoID))
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ({ value }) => value
  })
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });
app.get("/", (req, res) => res.send("Welcome to the PhotoShare API"));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.listen({ port: 4000 }, () =>
  console.info("Server.graphqlPath: ", server.graphqlPath)
);
