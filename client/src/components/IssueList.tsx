import { Avatar, Divider, List, Tag } from "antd";
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
            <div style={{ textAlign: "center" }}>
                <Divider><h2>Good for newcomers</h2></Divider>
                <br />
                <List
                    size="small"
                    itemLayout="horizontal"
                    pagination={{ pageSize: 10 }}
                    dataSource={this.state.issues}
                    renderItem={(item: any) => (
                        <List.Item key={item.title}>
                            <List.Item.Meta
                                avatar={
                                    <a href={item.repository.url} target="_blank">
                                        <Avatar size="large" src={item.repository.owner.avatarUrl}
                                            alt={item.repository.name} />
                                    </a>
                                }
                                title={
                                    <span>
                                        <a href={item.url} target="_blank">{item.title}</a>
                                    </span>
                                }
                                description={
                                    <div>
                                        <span>{"by " + item.author.login}</span>
                                        <Divider type="vertical" />
                                        <span>{"last update: " + new Date(item.updatedAt).toDateString()}</span>
                                    </div>

                                } />

                            {item.labels.nodes.map((label: any) => {
                                return <Tag color={"#" + label.color}>
                                    <a href={item.repository.url + "/issues?q=is%3Aissue+is%3Aopen"}>{label.name}</a>
                                </Tag>;
                            })}
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default IssueList;
