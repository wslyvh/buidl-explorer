import { GithubClient } from "../../github/GithubClient";

const issueResolver = {
    Query: {
        async issues(root: any, args: any, context: any) {
            const client = new GithubClient();
            return await client.getLatestIssues();
        },
    },
};

export default issueResolver;
