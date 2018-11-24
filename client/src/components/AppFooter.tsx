import { Icon } from "antd";
import React, { Component } from "react";

class AppFooter extends Component {
  public render() {
    return (
      <div className="footer-icons">
        <a href="https://twitter.com/wslyvh">
          <Icon type="twitter" /> <small>follow</small>
        </a>
        <a href="https://github.com/wslyvh/buidl-explorer/issues/new">
          <Icon type="github" /> <small>feedback</small>
        </a>
      </div>
    );
  }
}

export default AppFooter;
