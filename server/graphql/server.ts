import { ApolloServer, mergeSchemas } from "apollo-server-express";
import { GraphQLSchema } from "graphql/type";
import resolvers from "./resolvers/resolvers";
import schemas from "./schemas/schemas";

const schema: GraphQLSchema = mergeSchemas({ schemas, resolvers });

const apolloServer = new ApolloServer({ schema });

export default apolloServer;
