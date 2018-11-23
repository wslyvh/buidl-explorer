
import { Col, Layout, Row} from "antd";
import React, { Component } from "react";
import AppFooter from "./components/AppFooter";
import FeaturedRepositoryList from "./components/FeaturedRepositoryList";
import IssueList from "./components/IssueList";

import "./App.css";

const { Content, Footer, Header } = Layout;

class App extends Component {

  public render() {
    return (
      <Layout className="App">
        <Header className="header">
          <h1>#BUIDL Explorer</h1>
          <p>
            Starting with open-source projects can be freighting, especially in a fast moving space as blockchain. <br/>
            We'll help you get started and find the right open-source Ethereum projects to contribute to...
          </p>
          <p>
            Why contribute to open source? <a href="https://opensource.guide/">Read more.</a>
          </p>
        </Header>

        <Content>
          <Row type="flex" className="featured-repository-row">
            <Col span={16}>
              <FeaturedRepositoryList />
            </Col>
          </Row>
          <Row type="flex" className="newcomer-issues-row">
            <Col span={16}>
              <IssueList />
            </Col>
          </Row>
        </Content>

        <Footer>
          <AppFooter/>
        </Footer>
      </Layout>
    );
  }
}

export default App;
