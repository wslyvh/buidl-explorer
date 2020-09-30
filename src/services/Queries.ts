export class GithubQueries {
  public static DefaultPageSize = 4;

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
    primaryLanguage {
      name
      color
    }
    languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
      totalCount
      nodes {
        name
        color
      }
    }
  }`;

  public static SearchLatestRepositoriesQuery: string =
    `{
    search(first: ${GithubQueries.DefaultPageSize}, query: "topic:Ethereum good-first-issues:>=1 sort:stars-desc archived:false is:public stars:>5", type: REPOSITORY) {` +
    GithubQueries.GenericRepositoryQuery;

  public static SearchFeaturedRepositoriesQuery: string =
    `{
    search(first: ${GithubQueries.DefaultPageSize}, query: "topic:Ethereum good-first-issues:>=1 sort:updated-desc archived:false is:public stars:5..50", type: REPOSITORY) {` +
    GithubQueries.GenericRepositoryQuery;

  public static SearchNewIssueQuery: string = `
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      nodes {
        ... on Repository {
          name
          nameWithOwner
          createdAt
          url
          description
          homepageUrl
          primaryLanguage {
            name
            color
          }
          repositoryTopics(first: 3) {
            nodes {
              topic {
                name
              }
            }
          }
          issues(first: 10, labels: ["first-timers-only", "good first issue", "help wanted", "up-for-grabs"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
              repository {
                id
                name
                nameWithOwner
                url
              }
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }`;

  public static SearchNewGoodFirstQuery: string =
    `{
    search(first: 100, query: "topic:Ethereum good-first-issues:>=1 archived:false is:public stars:>5", type: REPOSITORY) {` +
    GithubQueries.SearchNewIssueQuery;

  public static SearchNewHelpWantedQuery: string =
    `{
  search(first: 100, query: "topic:Ethereum help-wanted-issues:>=1 archived:false is:public stars:>5", type: REPOSITORY) {` +
    GithubQueries.SearchNewIssueQuery;

  public static SearchIssueQuery: string = `{
    search(first: 25, query: "topic:Ethereum good-first-issues:>=1 archived:false is:public stars:>5", type: REPOSITORY) {
      repositoryCount
      nodes {
        ... on Repository {
          createdAt
          issues(first: 1, labels: ["first-timers-only", "good first issue", "help wanted", "up-for-grabs", "good for collaborators"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
