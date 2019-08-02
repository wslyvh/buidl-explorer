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
        Accept: "application/json",
        Authorization: "Bearer " + githubToken,
        "Content-Type": "application/json"
      }
    });
  }

  public async searchRepositories(args: ISearchArguments): Promise<any> {
    const after = args.startCursor ? `after:"${args.startCursor}",` : "";
    const type = args.type ? `${args.type}:>1` : "good-first-issues:>1";
    const query =
      `{
            search(first: ${
              args.first
            }, ${after} query: "topic:Ethereum ${type} sort:stars-desc archived:false is:public stars:>5", type: REPOSITORY) {` +
      GithubQueries.GenericRepositoryQuery;

    const response = await this.client.post("graphql", { query });
    const result = response.data.data.search;

    return result;
  }

  public async getLatestRepositories(): Promise<any> {
    const repositories = await this.post(
      GithubQueries.SearchLatestRepositoriesQuery
    );
    return repositories.sort(
      (a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount
    );
  }

  public async getFeaturedRepositories(): Promise<any> {
    const repositories = await this.post(
      GithubQueries.SearchFeaturedRepositoriesQuery
    );
    return repositories.sort(
      (a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount
    );
  }

  public async getNewIssues(): Promise<any> {
    const today = new Date();
    const sinceLastDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );

    const goodFirst = await this.post(GithubQueries.SearchNewGoodFirstQuery);
    const helpWanted = await this.post(GithubQueries.SearchNewHelpWantedQuery);
    const repositories = goodFirst.concat(helpWanted);

    const filteredRepos = repositories.filter(
      (r: any) =>
        r.issues.totalCount > 0 &&
        r.issues.nodes.some((i: any) => new Date(i.createdAt) > sinceLastDate)
    );

    let totalIssues = 0;
    const filtered = filteredRepos
      .map((repository: any) => {
        const issues = repository.issues.nodes
          .filter((i: any) => new Date(i.createdAt) > sinceLastDate)
          .map((issue: any) => {
            totalIssues++;
            return {
              author: issue.author ? issue.author.login : "",
              name: issue.title,
              url: issue.url
            };
          });

        return {
          description: repository.description,
          homepageUrl: repository.homepageUrl,
          issueCount: issues.length,
          issues,
          name: repository.nameWithOwner,
          primaryLanguage: repository.primaryLanguage,
          url: repository.url
        };
      })
      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1));

    console.log(`${totalIssues} new issues on ${filtered.length} repositories`);
    console.log("");

    for (const rep of filtered) {
      console.log(`${rep.name} - ${rep.description}`);
      console.log(`${rep.homepageUrl}`);
      console.log("");
      console.log(`${rep.issueCount} new issue(s)`);
      console.log(`Primary language: #${rep.primaryLanguage.name}`);
      console.log(rep.url + `/issues`);

      console.log("");

      let count = 1;
      for (const iss of rep.issues) {
        console.log(`${count}. ${iss.name} - ${iss.url}`);
        count++;
      }
      console.log("");
      console.log("=====");
      console.log("");
    }

    return filtered;
  }

  public async getLatestIssues(): Promise<any> {
    const repositories = await this.post(GithubQueries.SearchIssueQuery);
    const repositoryIssues = repositories.map((repository: any) => {
      return repository.issues.nodes.map((issue: any) => {
        return {
          ...issue
        };
      });
    });

    let issues = new Array<any>();
    for (const repository of repositoryIssues) {
      if (repository.length > 0) {
        issues = issues.concat(repository);
      }
    }

    return issues.sort(
      (a: any, b: any) => +new Date(b.updatedAt) - +new Date(a.updatedAt)
    );
  }

  private async post(query: string): Promise<any> {
    const response = await this.client.post("graphql", { query });
    return response.data.data.search.nodes;
  }
}
