import "./App.css";
import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
//export default class Searchbar extends React.Component
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      books: [], // object of title, author , categories
      query: "",
      booksOnDisplay: [],
    };
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };
  submitSearch = (event) => {};
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        booksOnDisplay: allBooks.filter((book) => book.shelf !== "none"),
      });
    });
  }

  updateQuerey(query) {
    this.setState({ query });
  }

  searchBooks(query) {
    BooksAPI.search(query).then((results) => {
      if (results && results.length > 0) {
        let searchResults = results;
        searchResults.map((book) => (book.shelf = "none"));
        this.state.search.map((book) => {});
      }
    });
  }

  render() {
    const filteredArray = this.state.books.filter((book) =>
    
      //book.includes(this.state.query)
      {
        if (book.author.includes(this.state.query)).map(book) {
          return true;
        }
      });

    
      
    
    return (
      <div>
        <input onChange={this.handleChange} value={this.state.query}></input>
        <button onClick={this.filteredArray}>Search</button>
      </div>
    );
  }
}

export default App;
