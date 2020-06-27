import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SearchBox from "./components/searchBox";
import Tweets from "./components/tweets";
import "./App.css";

class App extends Component {
  state = {
    query: ""
  };
  handleSearch = async query => {
    this.setState({ query });
  };
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/tweets"
            render={props => <Tweets query={this.state.query} />}
          />
          <Route
            path="/"
            render={props => (
              <SearchBox {...props} onSearch={this.handleSearch} />
            )}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
