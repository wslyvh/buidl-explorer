import React from "react";
import ReactDOM from "react-dom";
import RepositoryCard from "./RepositoryCard";

const repo = {
  description: "Official Go implementation of the Ethereum protocol",
  id: "MDEwOlJlcG9zaXRvcnkxNTQ1MjkxOQ==",
  name: "go-ethereum",
  owner: {
    avatarUrl: "https://avatars3.githubusercontent.com/u/6250754?v=4",
    id: "MDEyOk9yZ2FuaXphdGlvbjYyNTA3NTQ=",
    login: "ethereum",
    url: "https://github.com/ethereum",
  },
  stargazers:
  {
    totalCount: 21810,
  },
  url: "https://github.com/ethereum/go-ethereum",
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RepositoryCard repository={repo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
