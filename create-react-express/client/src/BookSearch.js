import React from "react";
import axios from "axios";

class BookSearch extends React.Component {
  state = {
    results: [],
    query: ""
  };

  handleInputChange = event => {
    this.setState({ query: event.target.vlaue });
  };

  searchForBooks = event => {
    event.preventDefault();

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=search+termsq=${
          this.state.query
        }`
      )
      .then(response => {
        console.log(response);
        this.setState({ results: response.data.items });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.searchForBooks}>
          <label htmlFor="search">Book Search</label>
          <input id="search" type="text" onChange={this.handleInputChange} />

          <button>Search</button>
        </form>
        <hr />
        {this.state.results.map(result => {
          return <div key={result.id}>{result.selfLink}</div>;
        })}
      </div>
    );
  }
}

export default BookSearch;
