import { Avatar, Divider, List } from "antd";
import React, { Component } from "react";

class IssueList extends Component {
  public state = {
    issues: [],
  };

  public componentDidMount() {

    this.callBackendAPI()
      .then((result) => this.setState({ issues: result }))
      .catch((error) => console.log(error));
  }

  public callBackendAPI = async () => {
    const response = await fetch("/api/issues");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  public render() {
    return (
        <div style={{textAlign: "center"}}>
            <Divider><h2>Good for newcomers</h2></Divider>

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={this.state.issues}
                renderItem={(item: any) => (
                    <List.Item key={item.title}>
                        <List.Item.Meta
                        avatar={<Avatar src={item.author.avatarUrl} />}
                        title={<a href={item.url} target="_blank">{item.title}</a>}
                        description={"Updated: " + new Date(item.updatedAt).toLocaleString()} />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );
  }
}

export default IssueList;
