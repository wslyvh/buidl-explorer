import React, { Component } from "react";
import { Link } from "react-router-dom";

class AppHeader extends Component {
  public render() {
    return (
      <div>
        <h1>
          <Link to="/">#BUIDL Explorer</Link>
        </h1>
        <p>
          Starting with open-source projects can be freighting, especially in a fast moving space as blockchain. <br />
          We'll help you get started and find the right open-source Ethereum projects to contribute to...
          </p>
        <p>
          Why contribute to open source? <a href="https://opensource.guide/">Read more.</a>
        </p>
      </div>
    );
  }
}

export default AppHeader;
