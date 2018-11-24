const { gql } = require('apollo-server-express');
const { client, searchLatestQuery, searchFeaturedQuery, searchIssueQuery } = require('./githubclient');

const typeDefs = gql`
  type Query {
    latestRepositories: [Repository]
    featuredRepositories: [Repository]
    issues: [Issue]
  }

  type Issue {
    id: String!
    number: String!
    title: String!
    bodyText: String!
    state: String!
    url: String!
    author: Author
    labels: Labels!
    repository: Repository
    createdAt: String!
    updatedAt: String!
  }

  type Repository {
    id: String!
    name: String!
    description: String!
    url: String!
    stargazers: Stargazers!
    owner: Owner!
  }

  type Author {
    login: String!
    url: String!
    avatarUrl: String!
  }

  type Owner {
    id: String!
    login: String!
    url: String!
    avatarUrl: String!
  }

  type Stargazers {
    totalCount: Int!
  }

  type Labels {
    totalCount: Int!
  }
`;

// Provide resolver functions for your schema fields  
const resolvers = {
  Query: {
    async latestRepositories() {
      return getLatestRepositories();
    },
    async featuredRepositories() {
      return getFeaturedRepositories();
    },
    async issues() {
      return getIssues();
    }
  },
};

const getLatestRepositories = async () => {

  var response = await client.post("graphql", { query: searchLatestQuery });
  var repositories = response.data.data.search.nodes;
  var result = repositories.sort(function (a, b) { return b.stargazers.totalCount - a.stargazers.totalCount; });

  return result;
};

const getFeaturedRepositories = async () => {

  var response = await client.post("graphql", { query: searchFeaturedQuery });
  var repositories = response.data.data.search.nodes;
  var result = repositories.sort(function (a, b) { return b.stargazers.totalCount - a.stargazers.totalCount; });

  return result;
};

const getIssues = async () => {
  var response = await client.post("graphql", { query: searchIssueQuery });

  // TODO: Clean up / improve
  const repositoryIssues = response.data.data.search.nodes.map((repository) => {
    return repository.issues.nodes.map((issue) => {
      return {
        ...issue
      }
    })
  });

  var issues = [];
  for (let index = 0; index < repositoryIssues.length; index++) {
    const issueList = repositoryIssues[index];
    if (issueList.length > 0) {
      issues = issues.concat(issueList);
    }
  }

  var result = issues.sort(function (a, b) { return new Date(b.updatedAt) - new Date(a.updatedAt) });
  return result;
}

module.exports = { typeDefs, resolvers, getLatestRepositories, getFeaturedRepositories, getIssues };
