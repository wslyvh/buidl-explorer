import React from "react";
import ReactDOM from "react-dom";
import AppFooter from "./AppFooter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppFooter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
