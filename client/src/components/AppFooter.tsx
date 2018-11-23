import { Icon } from "antd";
import React, { Component } from "react";

class AppFooter extends Component {
  public render() {
    return (
        <div className="footer-icons">
          <a href="https://twitter.com/wslyvh"><Icon type="twitter" /></a>
          <a href="https://github.com/wslyvh/buidl-explorer"><Icon type="github" /></a>
        </div>
    );
  }
}

export default AppFooter;
