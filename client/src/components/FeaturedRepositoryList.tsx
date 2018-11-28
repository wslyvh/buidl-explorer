import { Divider, Icon, List, Popover } from "antd";
import React, { Component } from "react";
import RepositoryCard from "./RepositoryCard";

class FeaturedRepositoryList extends Component {
  public state = {
    repos: [],
  };

  private infoFeatured = (
    <div>
      <p>Featured repositories are the most recent, upcoming repositories with &lt; 50 stars on Github.</p>
    </div>
  );

  public componentDidMount() {

    this.callBackendAPI()
      .then((result) => this.setState({ repos: result }))
      .catch((error) => console.log(error));
  }

  public callBackendAPI = async () => {
    const response = await fetch("/api/repositories/featured");
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
            <h2>Featured Repositories
            <small>
                <Popover content={this.infoFeatured}>
                  <Icon type="info-circle" theme="filled" />
                </Popover>
              </small>
            </h2>
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
        <div style={{ textAlign: "right" }}>
          <a href="/repositories">View all repositories &raquo;</a>
        </div>
      </div>
    );
  }
}

export default FeaturedRepositoryList;
