
import { Layout } from "antd";
import React, { Component } from "react";
import FeaturedRepositoryList from "./components/FeaturedRepositoryList";

import "./App.css";

const { Header, Content } = Layout;

class App extends Component {

  public render() {
    return (
      <Layout className="App">
        <Header className="header">
          <h1>#BUIDL Explorer</h1>
          <p>Join the #BUIDL movement and contribute to open-source Ethereum projects.</p>
        </Header>

        <Content style={{ background: "#fff", padding: 24, margin: 0, minHeight: 200 }}>
          <FeaturedRepositoryList />
        </Content>
      </Layout>
    );
  }
}

export default App;
