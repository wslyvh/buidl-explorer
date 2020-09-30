import axios, { AxiosInstance } from "axios";
import { ServerConfig } from "../config/server";
import { GithubQueries } from "./Queries";
import { ISearchArguments } from "./types";

export class GithubClient {
  private client: AxiosInstance;

  constructor() {
    const githubToken = ServerConfig.GITHUB_TOKEN;

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
    const after = args.startCursor ? `after:"${args.startCursor}",` : "";
    const type = args.type ? `${args.type}:>1` : "good-first-issues:>=1";
    const query =
      `{
            search(first: ${args.first}, ${after} query: "topic:Ethereum ${type} sort:stars-desc archived:false is:public stars:>5", type: REPOSITORY) {` +
      GithubQueries.GenericRepositoryQuery;

    const response = await this.client.post("graphql", { query });
    const result = response.data.data.search;

    return result;
  }

  public async getLatestRepositories(): Promise<any> {
    const repositories = await this.post(
      GithubQueries.SearchLatestRepositoriesQuery,
    );
    return repositories.sort(
      (a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount,
    );
  }

  public async getFeaturedRepositories(): Promise<any> {
    const repositories = await this.post(
      GithubQueries.SearchFeaturedRepositoriesQuery,
    );
    return repositories.sort(
      (a: any, b: any) => b.stargazers.totalCount - a.stargazers.totalCount,
    );
  }

  public async getNewIssues(): Promise<any> {
    const today = new Date();
    const sinceLastDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30,
    );

    const goodFirst = await this.getRecursive("good-first");
    const helpWanted = await this.getRecursive("help-wanted");
    const repositories = goodFirst.concat(helpWanted);

    const filteredRepos = repositories.filter(
      (r: any) =>
        r.issues.totalCount > 0 &&
        r.issues.nodes.some((i: any) => new Date(i.createdAt) > sinceLastDate),
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
              url: issue.url,
            };
          });

        let topics = [];
        if (repository.repositoryTopics) {
          topics = repository.repositoryTopics.nodes.map((topic: any) => {
            return topic.topic.name;
          });
        }

        return {
          description: repository.description,
          homepageUrl: repository.homepageUrl,
          issueCount: issues.length,
          issues,
          topics,
          name: repository.nameWithOwner,
          primaryLanguage: repository.primaryLanguage,
          url: repository.url,
        };
      })
      .sort((a: any, b: any) => (a.name > b.name ? 1 : -1));

    console.log(`${totalIssues} new issues on ${filtered.length} repositories`);
    console.log("");

    for (const rep of filtered) {
      console.log(`${rep.name} - ${rep.description}`);
      // console.log(`${rep.homepageUrl}`);
      console.log("");
      console.log(`${rep.issueCount} new issue(s) Good for newcomers`);
      console.log(rep.url + `/issues`);
      console.log("");

      // PRINT ISSUES
      // let count = 1;
      // for (const iss of rep.issues) {
      //   console.log(`${count}. ${iss.name} - ${iss.url}`);
      //   count++;
      // }

      if (rep.primaryLanguage) {
        console.log(`Primary language: #${rep.primaryLanguage.name}`);
      }

      // PRINT TOPICS
      let topics = "";
      for (const topic of rep.topics) {
        topics += `#${topic} `;
      }
      console.log("");
      console.log(topics);

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

    return issues.sort(
      (a: any, b: any) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
    );
  }

  private async getRecursive(type: string): Promise<any> {
    const query =
      `{
      search(first: 100, query: "topic:Ethereum ${type}-issues:>=1 archived:false is:public stars:>5", type: REPOSITORY) {` +
      GithubQueries.SearchNewIssueQuery;
    const response = await this.client.post("graphql", { query });
    let nodes = response.data.data.search.nodes;

    if (response.data.data.search.pageInfo.hasNextPage) {
      const nextQuery =
        `{
          search(last: 100, after:"${response.data.data.search.pageInfo.endCursor}" query: "topic:Ethereum ${type}-issues:>=1 archived:false is:public stars:>5", type: REPOSITORY) {` +
        GithubQueries.SearchNewIssueQuery;
      const nextResponse = await this.client.post("graphql", {
        query: nextQuery,
      });
      nodes = nodes.concat(nextResponse.data.data.search.nodes);
    }

    return nodes;
  }

  private async post(query: string): Promise<any> {
    const response = await this.client.post("graphql", { query });
    return response.data.data.search.nodes;
  }
}
