const { gql } = require('apollo-server-express');

const { repositories } = require('./data'); // Mocked data

// Construct a schema, using GraphQL schema language 
const typeDefs = gql`
  type Query {
    repositories: [Repository]
  }

  type Repository  {
    id: String!
    name: String!
    description: String!
    url: String!
    stargazersCount: Int!
    owner: Owner!
  }

  type Owner {
    id: String!
    login: String!
    url: String!
    avatarUrl: String!
  }
`;

// Provide resolver functions for your schema fields  
const resolvers = {
  Query: {
    repositories: () => { return repositories; }
  },
};

module.exports = { typeDefs, resolvers };
