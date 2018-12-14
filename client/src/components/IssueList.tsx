import { Avatar, Divider, Icon, List, Popover, Tag } from "antd";
import React, { Component } from "react";
import { OutboundLink } from "react-ga";

class IssueList extends Component {
    public state = {
        issues: [],
    };

    private infoIssues = (
        <div>
            <p>These issues are the most recent for each repository, that is specifically marked as 'good first issue' or 'help wanted'.</p>
        </div>
    );

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
                <Divider>
                    <h2>Good for newcomers
                        <small>
                            <Popover content={this.infoIssues}>
                                <Icon type="info-circle" theme="filled" />
                            </Popover>
                        </small>
                    </h2>
                </Divider>
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
                                    <OutboundLink eventLabel={item.repository.name} to={item.repository.url} target="_blank">
                                        <Avatar size="large" src={item.repository.owner.avatarUrl} alt={item.repository.name} />
                                    </OutboundLink>
                                }
                                title={
                                    <span>
                                        <OutboundLink eventLabel={item.repository.name} to={item.url} target="_blank">
                                            {item.title}
                                        </OutboundLink>
                                    </span>
                                }
                                description={
                                    <div>
                                        <span>{"by " + item.author.login}</span>
                                        <Divider type="vertical" />
                                        <span>{"last update: " + new Date(item.updatedAt).toDateString()}</span>
                                    </div>

                                } />

                            <div>
                                {item.labels.nodes.map((label: any, index: number) => {
                                    return <Tag key={index} color={"#" + label.color}>
                                        <OutboundLink eventLabel={item.repository.name} to={item.repository.url + "/issues?q=is%3Aissue+is%3Aopen"} target="_blank">
                                            {label.name}
                                        </OutboundLink>
                                    </Tag>;
                                })}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default IssueList;
