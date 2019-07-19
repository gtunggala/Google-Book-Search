import React from "react";
import Axios from "axios";

class SavedBooks extends React.Component {
  state = {
    savedBooks: []
  };

  componentDidMount() {
    this.fetchSavedBooks();
  }

  fetchSavedBooks = () => {
    Axios.get("/api/books").then(response => {
      this.setState({ savedBooks: response.data });
    });
  };
  render() {
    return (
      <div>
        <p>These are my saved books</p>
        {this.state.savedBooks.map(book => {
          return <div key={book._id}>{book.title} </div>;
        })}
      </div>
    );
  }
}

export default SavedBooks;
