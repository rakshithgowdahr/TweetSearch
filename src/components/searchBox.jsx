import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import "../css/SearchBox.css";
import "../css/theme.css";
import Header from "../common/header";
import twitter from "../twitter.png";
import { getUsers } from "../services/tweetService";

class SearchBox extends Component {
  state = {
    search: {
      query: ""
    },
    suggestions: []
  };
  handleChange = e => {
    const search = { ...this.state.search };
    search.query = e.currentTarget.value;
    this.setState({ search });
  };
  suggestionOnChange = (event, newValue) => {
    console.log(newValue);
  };
  render() {
    const { query } = this.state.search;
    return (
      <div className="centered">
        <Header image={twitter} />
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <Autosuggest
            inputProps={{
              autoComplete: "off",
              name: "user",
              id: "user",
              value: this.state.search.query,
              onChange: (event, { newValue }) => {
                const search = { ...this.state.search };
                search.query = newValue;
                this.setState({ search });
              }
            }}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={async ({ value }) => {
              if (!value) {
                this.setState({ suggestions: [] });
                return;
              }
              try {
                const result = await getUsers(value);
                this.setState({ suggestions: result.data });
              } catch (e) {
                this.setState({ suggestions: [] });
              }
            }}
            onSuggestionsClearRequested={() => {
              this.setState({ suggestions: [] });
            }}
            getSuggestionValue={suggestions => suggestions.name}
            renderSuggestion={suggestions => <div>{suggestions.name}</div>}
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <NavLink to="/tweets">
            <button
              disabled={query === ""}
              onClick={() => this.props.onSearch(query)}
              className="searchbtn"
            >
              SEARCH
            </button>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SearchBox;
