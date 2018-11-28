import React from "react";
import ReactDOM from "react-dom";
import Newsletter from "./Newsletter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Newsletter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
