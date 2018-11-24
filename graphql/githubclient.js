const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const client = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + githubToken,
  },
});

const genericQuery = `
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

const searchLatestQuery = `{
  search(first: 4, query: "topic:Ethereum good-first-issues:>1 sort:stars-desc archived:false is:public", type: REPOSITORY) {` +
  genericQuery;

const searchFeaturedQuery = `{
  search(first: 4, query: "topic:Ethereum good-first-issues:>1 stars:5..50 sort:updated-desc archived:false is:public", type: REPOSITORY) {` +
  genericQuery;

const searchIssueQuery = `{
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
}`

module.exports = { client, searchLatestQuery, searchFeaturedQuery, searchIssueQuery };
