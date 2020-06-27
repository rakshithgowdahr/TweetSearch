import React, { Component } from "react";
import Moment from "react-moment";
import { getTweets, getUsers } from "../services/tweetService";
import Autosuggest from "react-autosuggest";
import "../css/tweets.css";
import Header from "../common/header";
import twitter1 from "../twitter1.png";

class Tweets extends Component {
  state = {
    tweets: [],
    search: {
      query: this.props.query
    },
    suggestions: []
  };
  async componentDidMount() {
    const { query } = this.props;
    if (query !== "") localStorage.setItem("query", query);
    const search = { ...this.state.search };
    search.query = localStorage.getItem("query");
    this.setState({ search });
    const { data: tweets } = await getTweets(search.query);
    this.setState({ tweets: tweets });
  }
  handleChange = e => {
    const search = { ...this.state.search };
    search.query = e.currentTarget.value;
    this.setState({ search });
  };
  handleSearch = async () => {
    localStorage.setItem("query", this.state.search.query);
    const { data: tweets } = await getTweets(this.state.search.query);
    this.setState({ tweets: tweets });
  };
  render() {
    const {
      search: { query },
      tweets
    } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-3">
            <Header image={twitter1} />
          </div>
          <div className="col-md-6">
            <div
              style={{ padding: "12px 25px 0px 80px" }}
              className="form-group has-search"
            >
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
          </div>
          <div className="col-md-3">
            <div style={{ padding: "13px 0px" }}>
              <button
                disabled={query === ""}
                onClick={() => this.handleSearch()}
                className="searchbtn"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
        <div className="row grey">
          {tweets.length !== 0 &&
            tweets.map(tweet => (
              <div key={tweet.id} className="col-md-4">
                <div
                  style={{
                    margin: "10px",
                    boxShadow:
                      "0 1px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 5px 0 rgba(0, 0, 0, 0.19)"
                  }}
                  className="card"
                >
                  <div
                    style={{ padding: "18px 15px 1px 15px" }}
                    className="card-body"
                  >
                    <div style={{ marginBottom: "-1px" }} className="left">
                      <div className="left">
                        <img
                          className="img"
                          src={tweet.user.profile_image_url}
                          alt="none"
                        />
                      </div>
                      <div className="right">
                        <p style={{ padding: "0px 2px 2px 10px" }}>
                          <b style={{ fontSize: "14px" }}>{tweet.user.name}</b>
                          <p style={{ fontSize: "10px" }}>
                            {"@" + tweet.user.screen_name}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div style={{ fontSize: "12px" }} className="right">
                      <Moment format="MMM d, yyyy">{tweet.created_at}</Moment>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div>
                      <p style={{ fontSize: "12px" }}>{tweet.text}</p>
                      <div>
                        <p style={{ fontSize: "13px" }} className="left">
                          <i
                            style={{ paddingRight: "6px" }}
                            className="fa fa-comment-o"
                            aria-hidden="true"
                          ></i>
                          {tweet.retweet_count}
                        </p>
                        <p style={{ fontSize: "13px" }}>
                          <img
                            style={{ padding: "0px 6px 0px 30px" }}
                            src="https://img.icons8.com/small/16/000000/retweet.png"
                            alt=""
                          />
                          {tweet.favorite_count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Tweets;
