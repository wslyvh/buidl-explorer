import React from "react";
import ReactDOM from "react-dom";
import { repositories } from "../../../graphql/mocks";
import RepositoryCard from "./RepositoryCard";

const repo = repositories[0];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RepositoryCard repository={repo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
