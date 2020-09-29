import { ApolloServer, gql } from "apollo-server-lambda";
import { GithubClient } from "../services/GithubClient";
import { ISearchArguments } from "../services/types";

const typeDefs = gql`
  type Query {
    searchRepositories(
      first: Int!
      type: String
      startCursor: String
      endCursor: String
    ): SearchResults
  }

  type SearchResults {
    repositoryCount: Int
    pageInfo: PageInfo
    nodes: [Repository]
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
  }

  type Repository {
    id: String!
    name: String!
    description: String
    url: String!
    stargazers: Stargazers!
    primaryLanguage: Language
    languages: Languages
    owner: Owner!
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

  type Languages {
    totalCount: Int!
    nodes: [Language]
  }

  type Language {
    name: String!
    color: String
  }
`;

const resolvers = {
  Query: {
    async searchRepositories(root: any, args: any, context: any) {
        const client = new GithubClient();
        return await client.searchRepositories(args as ISearchArguments);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
