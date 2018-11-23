import { Avatar, Card, Icon } from "antd";
import React from "react";
import { IRepository } from "../types";

const { Meta } = Card;

interface IRepositoryProps {
  repository: IRepository;
}

const RepositoryCard: React.SFC<IRepositoryProps> = (props) => {
  return (
    <Card style={{ marginTop: 16, textAlign: "right" }}>
      <a href={props.repository.url} target="_blank">
          <Meta style={{ textAlign: "left" }}
              avatar={<Avatar src={props.repository.owner.avatarUrl} />}
              title={props.repository.name}
              description={props.repository.description} />
      </a>
      <br/>
      <Icon type="star" theme="twoTone" twoToneColor="#fdd835" /> {props.repository.stargazers.totalCount}
    </Card>
  );
};

export default RepositoryCard;
