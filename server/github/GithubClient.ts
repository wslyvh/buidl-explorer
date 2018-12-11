import axios, { AxiosInstance } from "axios";
import * as dotenv from "dotenv";
import { GithubQueries } from "./Queries";
import { ISearchArguments } from "./types";

dotenv.config();

export class GithubClient {

    private client: AxiosInstance;

    constructor() {

        const githubToken = process.env.GITHUB_TOKEN;

        this.client = axios.create({
            baseURL: "https://api.github.com/",
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + githubToken,
                "Content-Type": "application/json",
            },
        });
    }

    public async searchRepositories(args: ISearchArguments): Promise<any> {
        const after = args.endCursor ? `after:"${args.endCursor}",` : "";
        const query = `{
            search(first: ${args.first}, ${after} query: "topic:Ethereum good-first-issues:>1 sort:stars-desc archived:false is:public stars:>5", type: REPOSITORY) {` +
            GithubQueries.GenericRepositoryQuery;

        const response = await this.client.post("graphql", { query });
        const searchResults = response.data.data.search;
        return searchResults;
    }

    public async getLatestRepositories(): Promise<any> {
        const repositories = await this.post(GithubQueries.SearchLatestRepositoriesQuery);
        return repositories.sort((a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount);
    }

    public async getFeaturedRepositories(): Promise<any> {
        const repositories = await this.post(GithubQueries.SearchFeaturedRepositoriesQuery);
        return repositories.sort((a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount);
    }

    public async getNewIssues(): Promise<any> {
        const repositories = await this.post(GithubQueries.SearchNewIssueQuery);
        const repositoryIssues = repositories.map((repository: any) => {
            return repository.issues.nodes.map((issue: any) => {
                return {
                    ...issue,
                };
            });
        });

        let issues = new Array<any>();
        for (const repository of repositoryIssues) {
            if (repository.length > 0) {
                issues = issues.concat(repository);
            }
        }

        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        const filtered = issues.filter((issue) => new Date(issue.createdAt) > lastWeek);

        return filtered; // .sort((a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }

    public async getLatestIssues(): Promise<any> {
        const repositories = await this.post(GithubQueries.SearchIssueQuery);
        const repositoryIssues = repositories.map((repository: any) => {
            return repository.issues.nodes.map((issue: any) => {
                return {
                    ...issue,
                };
            });
        });

        let issues = new Array<any>();
        for (const repository of repositoryIssues) {
            if (repository.length > 0) {
                issues = issues.concat(repository);
            }
        }

        return issues.sort((a: any, b: any) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
    }

    private async post(query: string): Promise<any> {

        const response = await this.client.post("graphql", { query });
        return response.data.data.search.nodes; // Better Data mapping / or pass-through
    }
}
