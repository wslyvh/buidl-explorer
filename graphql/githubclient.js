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

const featuredRepoQuery = `{
  search(first: 8, query: "topic:Ethereum good-first-issues:>1 stars:>20", type: REPOSITORY) {
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
}`

module.exports = { client, featuredRepoQuery };
