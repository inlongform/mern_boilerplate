import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="app">
            <Route exact path="/" component={Landing} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
