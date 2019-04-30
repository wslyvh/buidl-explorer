import { Icon, Tag } from "antd";
import React from "react";
import { Emojione } from "react-emoji-render";
import { IRepository } from "../types";

interface IRepositoryProps {
  repository: IRepository;
}

const RepositoryCard: React.SFC<IRepositoryProps> = (props) => {
  const color = props.repository.primaryLanguage
    ? props.repository.primaryLanguage.color
    : "#ccc";
  const languageLabel = props.repository.primaryLanguage ? (
    <Tag color={color}>{props.repository.primaryLanguage.name}</Tag>
  ) : null;
  const description = props.repository.description
    ? props.repository.description
    : "";

  return (
    <div className="repository-card" style={{ borderTop: "5px solid" + color }}>
      <a href={props.repository.url} target="_blank">
        <img
          className="avatar"
          src={props.repository.owner.avatarUrl}
          alt={props.repository.name}
        />
        <h3>{props.repository.name}</h3>
        <p className="max-lines">
          <Emojione text={description} />
        </p>
        <footer>
          {languageLabel}
          <Icon type="star" theme="twoTone" twoToneColor="#fdd835" />{" "}
          {props.repository.stargazers.totalCount}
        </footer>
      </a>
    </div>
  );
};

export default RepositoryCard;
