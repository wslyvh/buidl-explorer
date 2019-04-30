import { Button, Divider, List, Tag } from "antd";
import gql from "graphql-tag";
import React, { Component } from "react";
import { SearchRepositoryQuery } from "../data/queries/RepositoryQuery";
import { IRepository, ISearchRepositories } from "../types";
import RepositoryCard from "./RepositoryCard";

const languages = [
  {
    color: "#f34b7d",
    name: "C++",
  },
  {
    color: "#db5855",
    name: "Clojure",
  },
  {
    color: "#375eab",
    name: "Go",
  },
  {
    color: "#5e5086",
    name: "Haskell",
  },
  {
    color: "#b07219",
    name: "Java",
  },
  {
    color: "#f1e05a",
    name: "JavaScript",
  },
  {
    color: "#f18e33",
    name: "Kotlin",
  },
  {
    color: "#37775b",
    name: "Nim",
  },
  {
    color: "#4F5D95",
    name: "PHP",
  },
  {
    color: "#3572A5",
    name: "Python",
  },
  {
    color: "#701516",
    name: "Ruby",
  },
  {
    color: "#c22d40",
    name: "Scala",
  },
  {
    color: "#AA6746",
    name: "Solidity",
  },
  {
    color: "#2b7489",
    name: "TypeScript",
  },
];

const GET_REPOS = gql`
  query($first: Int!, $type: String, $startCursor: String, $endCursor: String) {
    searchRepositories(
      first: $first
      type: $type
      startCursor: $startCursor
      endCursor: $endCursor
    ) {
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        name
        description
        url
        owner {
          login
          url
          avatarUrl
        }
        stargazers {
          totalCount
        }
        primaryLanguage {
          name
          color
        }
        languages {
          totalCount
          nodes {
            name
          }
        }
      }
    }
  }
`;

export interface IProps {
  limit: number;
  searchResultData: ISearchRepositories;
}

export interface IState {
  type: string;
  filter: string;
}

class RepositoryOverview extends Component<IProps, IState> {
  public static defaultProps = {
    limit: 4,
    searchResultData: null,
  };

  public static defaultState = {
    filter: "",
    type: "good-first-issues",
  };

  public setType(name: string) {
    this.setState({ type: name });
  }

  public filter(name: string) {
    this.setState({ filter: name });
  }

  public render() {
    const { limit, searchResultData } = this.props;
    const issueType =
      this.state && this.state.type ? this.state.type : "good-first-issues";

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Divider>
            <h2>All Repositories</h2>
          </Divider>

          <div>
            <Tag>
              <a href="#" onClick={() => this.setType("good-first-issues")}>
                Good First issues
              </a>
            </Tag>
            <Tag>
              <a href="#" onClick={() => this.setType("help-wanted-issues")}>
                Help Wanted issues
              </a>
            </Tag>
          </div>
          <br />

          <div>
            {languages.map((language: any, index: number) => {
              return (
                <Tag
                  key={index}
                  color={language.color}
                  style={{ padding: "10px 15px 30px 15px", fontSize: 12 }}
                >
                  <a href="#" onClick={() => this.filter(language.name)}>
                    {language.name}
                  </a>
                </Tag>
              );
            })}
            <a
              href="#"
              hidden={this.state && this.state.filter === ""}
              onClick={() => this.filter("")}
            >
              Clear
            </a>
          </div>
          <br />
          <br />

          <SearchRepositoryQuery
            query={GET_REPOS}
            variables={{ first: limit, type: issueType }}
          >
            {({ loading, error, data, fetchMore }) => {
              if (error) {
                return `Error!: ${error}`;
              }
              const pageInfo =
                data && data.searchRepositories
                  ? data.searchRepositories.pageInfo
                  : { hasNextPage: false, endCursor: "" };
              let repositories =
                data && data.searchRepositories
                  ? data.searchRepositories.nodes
                  : [];

              if (this.state && this.state.filter) {
                repositories = repositories.filter((repo: any) =>
                  repo.languages.nodes.some(
                    (x: any) => x.name === this.state.filter,
                  ),
                );
              }

              if (pageInfo.hasNextPage) {
                fetchMore({
                  query: GET_REPOS,
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (fetchMoreResult) {
                      previousResult.searchRepositories.pageInfo =
                        fetchMoreResult.searchRepositories.pageInfo;
                      previousResult.searchRepositories.nodes = [
                        ...previousResult.searchRepositories.nodes,
                        ...fetchMoreResult.searchRepositories.nodes,
                      ];
                    }

                    return previousResult;
                  },
                  variables: {
                    first: limit,
                    startCursor: pageInfo.endCursor,
                    type: issueType,
                  },
                });
              }

              return (
                <List
                  loading={loading}
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 4,
                    xxl: 4,
                  }}
                  dataSource={repositories}
                  loadMore={<span>&nbsp;</span>}
                  renderItem={(repo: IRepository) => (
                    <List.Item>
                      <RepositoryCard key={repo.id} repository={repo} />
                    </List.Item>
                  )}
                />
              );
            }}
          </SearchRepositoryQuery>
        </div>
      </div>
    );
  }
}

export default RepositoryOverview;
