
import { Col, Layout, Row } from "antd";
import React, { Component } from "react";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import FeaturedRepositoryList from "../components/FeaturedRepositoryList";
import IssueList from "../components/IssueList";
import Newsletter from "../components/Newsletter";

import "../App.css";

const { Content, Footer, Header } = Layout;

class Repositories extends Component {
  public render() {
    return (
      <Layout className="App">
        <Header className="header">
          <AppHeader />
        </Header>

        <Content>
          <Row type="flex" className="featured-repository-row">
            <Col span={16}>
              Repositories
            </Col>
          </Row>
        </Content>

        <Footer>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default Repositories;
