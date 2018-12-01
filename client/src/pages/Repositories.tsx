
import { Col, Layout, Row } from "antd";
import { ApolloClient, ApolloClientOptions, HttpLink, InMemoryCache } from "apollo-boost";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import RepositoryOverview from "../components/RepositoryOverview";

import "../App.css";

const { Content, Footer, Header } = Layout;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink(),
});

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
              <ApolloProvider client={client}>
                <RepositoryOverview />
              </ApolloProvider>
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
