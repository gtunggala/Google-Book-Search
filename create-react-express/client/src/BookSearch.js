import React from "react";
import axios from "axios";

class BookSearch extends React.Component {
  state = {
    results: [],
    query: ""
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  searchForBooks = event => {
    event.preventDefault();

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.query}`)
      .then(response => {
        console.log(response.data.items);
        this.setState({ results: response.data.items });
      })
      .catch(error => {
        console.error(error);
      });
  };

  saveBook = book => {
    axios.post("/api/books", {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
      link: book.volumeInfo.previewlink
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.searchForBooks}>
          <label htmlFor="search">Book Search</label>
          <input id="search" type="text" onChange={this.handleInputChange} />

          <button type="submit">Search</button>
        </form>
        <hr />
        {this.state.results.map(result => {
          return (
            <div key={result.id}>
              <h2>{result.volumeInfo.title}</h2>
              {result.volumeInfo.authors &&
                result.volumeInfo.authors.map(author => {
                  return <p key={author}>{author}</p>;
                })}
              <p>{result.volumeInfo.description}</p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={result.volumeInfo.previewLink}
              >
                View
              </a>
              <button onClick={() => this.saveBook(result)}>Save</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default BookSearch;
