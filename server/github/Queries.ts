export class GithubQueries {

  public static GenericRepositoryQuery: string = `
    repositoryCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    nodes {
      ...Repository
    }
  }
  }

  fragment Repository on Repository {
  id
  name
  description
  url
  stargazers {
    totalCount
  }
  owner {
    id
    login
    avatarUrl
    url
  }
  }`;

  public static SearchLatestRepositoriesQuery: string = `{
    search(first: 4, query: "topic:Ethereum good-first-issues:>1 sort:stars-desc archived:false is:public", type: REPOSITORY) {` +
    GithubQueries.GenericRepositoryQuery;

  public static SearchFeaturedRepositoriesQuery: string = `{
    search(first: 4, query: "topic:Ethereum good-first-issues:>1 sort:updated-desc archived:false is:public stars:5..50", type: REPOSITORY) {` +
    GithubQueries.GenericRepositoryQuery;

  public static SearchIssueQuery: string = `{
    search(first: 50, query: "topic:Ethereum good-first-issues:>1 stars:>10", type: REPOSITORY) {
      repositoryCount
      nodes {
        ... on Repository {
          createdAt
          issues(first: 1, labels: ["first-timers-only", "good first issue", "help wanted", "up-for-grabs"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              id
              number
              title
              bodyText
              state
              url
              author {
                avatarUrl
                login
                url
              }
              labels(first: 10) {
                totalCount
                nodes {
                  name
                  color
                }
              }
              repository {
                id
                name
                description
                url
                stargazers {
                  totalCount
                }
                owner {
                  id
                  login
                  avatarUrl
                  url
                }
              }
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }`;

}
