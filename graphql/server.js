const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = { apolloServer };
