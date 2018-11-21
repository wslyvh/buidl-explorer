import React, { Component } from "react";
import "./App.css";

class App extends Component {
  public state = {
    data: null,
  };

  public componentDidMount() {

    this.callBackendAPI()
      .then((result) => this.setState({ data: result }))
      .catch((error) => console.log(error));
  }

  public callBackendAPI = async () => {
    const response = await fetch("/api/issues");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">#BUIDL Explorer</h1>
        </header>
        <p className="App-intro">
          Join the #BUIDL movement and contribute to open-source Ethereum projects
        </p>
        <p className="App-content">{this.state.data}</p>
      </div>
    );
  }
}

export default App;
