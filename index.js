const { ApolloServer } = require("apollo-server");

const typeDefs = `
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
    githubLogin: "gPlake"
  },
  {
    id: 2,
    name: "rgfsafsdaf",
    description: "cdsfsadbvdfvasfdv",
    category: "SELFIE",
    githubLogin: "sSchmidt"
  },
  {
    id: 3,
    name: "bhrgther4564",
    description: "sdfasdf142465nfghjnrth",
    category: "LANDSCAPE",
    githubLogin: "sSchmidt"
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
        ...input
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
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.info("Graphql Server running on: ", url));
