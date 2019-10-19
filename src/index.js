import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }
  componentDidMount() {
    this.searchHandler("");
  }
  triggerSearch(keyword) {
    const searchKey = keyword !== "" ? keyword : "adobe";
    axios
      .get(
        "https://aravindtwitter.herokuapp.com/twittersearch?key=" + searchKey
      )
      .then(response => {
        this.setState({
          data: response.data.statuses
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  searchHandler(keyword) {
    this.triggerSearch(keyword);
    setInterval(() => {
      this.triggerSearch(keyword);
    }, 30000);
  }
  render() {
    return (
      <Container className="App" justify="center">
        <Header />
        <SearchBar data={this.state.data} triggerSearch={this.searchHandler} />
      </Container>
    );
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainContainer />
        </Route>
        <Route path="/:searchKey" children={<MainContainer />} />
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
