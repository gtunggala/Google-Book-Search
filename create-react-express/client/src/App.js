import React, { Component } from "react";
import BookSearch from "./BookSearch";
import SavedBooks from "./SavedBooks";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>Google Books</li>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/books">Saved</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h1>React Google Books Search</h1>
          <p>Search and Save Books of Interest</p>
        </div>
        <Route path="/" exact component={BookSearch} />
        <Route path="/books" component={SavedBooks} />
      </Router>
    );
  }
}

export default App;
