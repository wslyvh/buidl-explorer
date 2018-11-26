import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const repositorySchema: GraphQLSchema = makeExecutableSchema({ typeDefs: gql`
	type Query {
		latestRepositories: [Repository]
		featuredRepositories: [Repository]
	}

	type Repository {
		id: String!
		name: String!
		description: String!
		url: String!
		stargazers: Stargazers!
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
`});

addMockFunctionsToSchema({ schema: repositorySchema });

export default repositorySchema;
