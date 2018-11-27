import React from "react";
import ReactDOM from "react-dom";
import Repositories from "./Repositories";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Repositories />, div);
  ReactDOM.unmountComponentAtNode(div);
});
