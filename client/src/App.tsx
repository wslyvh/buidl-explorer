import React, { Component } from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";

class App extends Component {

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
