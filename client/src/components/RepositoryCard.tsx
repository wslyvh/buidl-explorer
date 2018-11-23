import { Card, Icon } from "antd";
import React from "react";
import { IRepository } from "../types";

const { Meta } = Card;

interface IRepositoryProps {
  repository: IRepository;
}

const RepositoryCard: React.SFC<IRepositoryProps> = (props) => {
  return (
    <div className="featured-repository">
      <a href={props.repository.url} target="_blank">
        <img className="avatar" src={props.repository.owner.avatarUrl} alt={props.repository.name} />
        <h3>{props.repository.name}</h3>
        <p>{props.repository.description}</p>
        <footer>
          <Icon type="star" theme="twoTone" twoToneColor="#fdd835" /> {props.repository.stargazers.totalCount}
        </footer>
      </a>
    </div>
  );
};

export default RepositoryCard;
