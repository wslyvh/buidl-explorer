import { Button, Divider, List } from "antd";
import gql from "graphql-tag";
import React, { Component } from "react";
import { SearchRepositoryQuery } from "../data/queries/RepositoryQuery";
import { IRepository, ISearchRepositories } from "../types";
import RepositoryCard from "./RepositoryCard";

const GET_REPOS = gql`
query($first: Int!, $startCursor:String, $endCursor: String) {
  searchRepositories(first: $first, startCursor: $startCursor, endCursor: $endCursor) {
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
        }
    }
}`;

export interface IProps {
    limit: number;
    searchResultData: ISearchRepositories;
}

class RepositoryOverview extends Component<IProps> {
    public static defaultProps = {
        limit: 4,
        searchResultData: null,
    };

    public render() {
        const { limit, searchResultData } = this.props;

        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Divider>
                        <h2>
                            All Repositories
                        </h2>
                    </Divider>

                    <SearchRepositoryQuery query={GET_REPOS} variables={{ first: limit }}>
                        {({ loading, error, data, fetchMore }) => {
                            if (error) { return `Error!: ${error}`; }
                            const pageInfo = (data && data.searchRepositories) ? data.searchRepositories.pageInfo : { hasNextPage: false, endCursor: "" };
                            const repositories = (data && data.searchRepositories) ? data.searchRepositories.nodes : [];
                            // searchResultData

                            if (pageInfo.hasNextPage) {
                                fetchMore({
                                    query: GET_REPOS,
                                    updateQuery: (previousResult, { fetchMoreResult }) => {
                                        if (fetchMoreResult) {
                                            previousResult.searchRepositories.pageInfo = fetchMoreResult.searchRepositories.pageInfo;
                                            previousResult.searchRepositories.nodes = [...previousResult.searchRepositories.nodes, ...previousResult.searchRepositories.nodes];
                                        }

                                        return previousResult;
                                    },
                                    variables: { startCursor: pageInfo.endCursor },
                                });
                            }

                            return (
                                <List
                                    loading={loading}
                                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
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
