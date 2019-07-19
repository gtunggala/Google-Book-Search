import React, { Component } from "react";
import BookSearch from "./BookSearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>Google Books</li>
            <li>Search</li>
            <li>Saved</li>
          </ul>
        </nav>
        <div>
          <h1>React Google Books Search</h1>
          <p>Search and Save Books of Interest</p>
        </div>
        <BookSearch />
      </div>
    );
  }
}

export default App;
