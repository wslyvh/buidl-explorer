const { gql } = require('apollo-server-express');
const { client, repoQuery } = require('./githubclient'); 

const typeDefs = gql`
  type Query {
    repositories: [Repository]
  }

  type Repository  {
    id: String!
    name: String!
    description: String!
    url: String!
    stargazers: Stargazers!
    owner: Owner!
  }

  type Stargazers {
    totalCount: Int!
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
    async repositories () { 
      var response = await client.post("graphql", { query: repoQuery });
      return response.data.data.search.nodes; 
    }
  },
};

module.exports = { typeDefs, resolvers };
