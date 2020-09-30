import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import RepositoryOverview from "./RepositoryOverview";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink(),
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ApolloProvider client={client}>
      <RepositoryOverview />
    </ApolloProvider>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
