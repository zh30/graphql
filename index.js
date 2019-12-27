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
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String!
        category: PhotoCategory!
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
let photos = [];
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
    url: ({ id }) => `https://zhanghe.org/images/${id}.jpg`
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ url }) => console.info("Graphql Server running on: ", url));
