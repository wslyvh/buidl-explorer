import { Divider, List } from "antd";
import React, { Component } from "react";
import RepositoryCard from "./RepositoryCard";

class RepositoryOverview extends Component {
    public state = {
        repos: [],
    };

    public componentDidMount() {

        this.callBackendAPI()
            .then((result) => this.setState({ repos: result }))
            .catch((error) => console.log(error));
    }

    public callBackendAPI = async () => {
        const response = await fetch("/api/repositories/latest");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    public render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    <Divider>
                        <h2>All Repositories</h2>
                    </Divider>

                    <List
                        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
                        dataSource={this.state.repos} renderItem={(repo: any) => (
                            <List.Item>
                                <RepositoryCard key={repo.id} repository={repo} />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default RepositoryOverview;
