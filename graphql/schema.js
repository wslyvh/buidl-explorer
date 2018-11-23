const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language // Import 
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields // Import 
const resolvers = {
  Query: {
    hello: () => 'Hello world...',
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = {
  apolloServer,
};
