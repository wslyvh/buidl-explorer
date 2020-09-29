import { Col, Layout, Row } from "antd";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import AppFooter from "../components/AppFooter";
import AppHeader from "../components/AppHeader";
import RepositoryOverview from "../components/RepositoryOverview";

import "../App.css";

const { Content, Footer, Header } = Layout;
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "/.netlify/functions/graphql" }),
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
                <RepositoryOverview limit={100} />
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
