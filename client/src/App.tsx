import React, { Component } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";

class App extends Component {

  constructor(props: any, context: any) {
    super(props, context);
    if (window && window.location && window.location.host && window.location.host.includes("herokuapp")) {
      console.log("REDIRECT", window.location.host);
      window.location.assign("https://ethissue.watch/");
    }
  }

  public render() {
    return (
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/repositories" component={Repositories}/>
        </Switch>
    );
  }
}

export default App;
