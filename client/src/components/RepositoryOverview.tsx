import { Divider, List } from "antd";
import gql from "graphql-tag";
import React, { Component } from "react";
import { SearchRepositoryQuery } from "../data/queries/RepositoryQuery";
import RepositoryCard from "./RepositoryCard";

const GET_REPOS = gql`
query($first: Int!) {
    searchRepositories(first: $first) {
        id
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
    }
}`;

class RepositoryOverview extends Component {

    public render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Divider>
                        <h2>All Repositories</h2>
                    </Divider>

                    <SearchRepositoryQuery query={GET_REPOS} variables={{first: 100}}>
                        {({ loading, error, data }) => {
                            if (error) { return `Error!: ${error}`; }
                            const result = data ? data.searchRepositories : [];

                            return (
                                <List
                                    loading={loading}
                                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                                    dataSource={result}
                                    renderItem={(repo: any) => (
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
