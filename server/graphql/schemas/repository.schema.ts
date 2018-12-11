import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const repositorySchema: GraphQLSchema = makeExecutableSchema({ typeDefs: gql`
	type Query {
		searchRepositories(first: Int!, startCursor: String, endCursor: String): SearchResults
		latestRepositories: [Repository]
		featuredRepositories: [Repository]
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
		description: String!
		url: String!
		stargazers: Stargazers!
		primaryLanguage: Language
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

	type Language {
		name: String!
		color: String
	}
`});

addMockFunctionsToSchema({ schema: repositorySchema });

export default repositorySchema;
