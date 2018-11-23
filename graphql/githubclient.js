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
  search(first: 10, query: "topic:Ethereum good-first-issues:>1 stars:5..50", type: REPOSITORY) {
    repositoryCount
    nodes {
      ... on Repository {
        issues(first: 5, labels: ["first-timers-only", "good first issue", "up-for-grabs"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            number
            title
            url
            state
            author {
              avatarUrl
              login
              url
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
