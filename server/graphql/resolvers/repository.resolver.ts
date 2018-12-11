import { GithubClient } from "../../github/GithubClient";
import { ISearchArguments } from "../../github/types";

const repositoryResolver = {
    Query: {
        async searchRepositories(root: any, args: any, context: any) {
            const client = new GithubClient();
            return await client.searchRepositories(args as ISearchArguments);
        },
        async latestRepositories(root: any, args: any, context: any) {
            const client = new GithubClient();
            return await client.getLatestRepositories();
        },
        async featuredRepositories(root: any, args: any, context: any) {
            const client = new GithubClient();
            return await client.getFeaturedRepositories();
        },
    },
};

export default repositoryResolver;
