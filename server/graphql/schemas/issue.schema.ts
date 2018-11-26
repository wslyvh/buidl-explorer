import { addMockFunctionsToSchema, gql, makeExecutableSchema } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

const issueSchema: GraphQLSchema = makeExecutableSchema({ typeDefs: gql`
	type Query {
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
		owner: Owner!
	}

	type Owner {
		id: String!
		login: String!
		url: String!
		avatarUrl: String!
	}

	type Author {
		login: String!
		url: String!
		avatarUrl: String!
	}

	type Labels {
		totalCount: Int!
	}
`});

addMockFunctionsToSchema({ schema: issueSchema });

export default issueSchema;
