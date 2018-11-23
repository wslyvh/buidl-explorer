import { List, Row } from "antd";
import React, { Component } from "react";
import RepositoryCard from "./RepositoryCard";

class FeaturedRepositoryList extends Component {
  public state = {
    repos: [],
  };

  public componentDidMount() {

    this.callBackendAPI()
      .then((result) => this.setState({ repos: result }))
      .catch((error) => console.log(error));
  }

  public callBackendAPI = async () => {
    const response = await fetch("/api/repositories");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  public render() {
    return (
        <Row>
            <h2>Featured Repositories</h2>

            <div>
                <List grid={{ gutter: 24, column: 4 }}
                    dataSource={this.state.repos} renderItem={(repo: any) => (
                        <List.Item>
                            <RepositoryCard repository={repo} />
                        </List.Item>
                    )}
                />
            </div>
        </Row>
    );
  }
}

export default FeaturedRepositoryList;
