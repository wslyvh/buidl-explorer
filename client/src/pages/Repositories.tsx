
import { Col, Layout, Row } from "antd";
import React, { Component } from "react";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import RepositoryOverview from "../components/RepositoryOverview";

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
              <RepositoryOverview />
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
