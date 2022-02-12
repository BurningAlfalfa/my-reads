import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Book } from "./Book";
import { Search } from "./Search";
import * as BooksAPI from "./BooksAPI";

//export default class Searchbar extends React.Component

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      bookWithShelves: [],
    };
  }
  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({
        bookWithShelves: allBooks.filter((book) => book.shelf !== "none"),
      });
    });
  }

  render() {
    return (
      // <Search />
      // <BrowserRouter>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home bookWithShelves={this.state.bookWithShelves} />
          </Route>
          <Route exact path="/search">
            <Search bookWithShelves={this.state.bookWithShelves} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      //bookWithShelves: [], lifting up state
      addBookButton: false,
    };
  }

  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            fontSize: 40,
            color: "white",
            padding: 15,
          }}
        >
          MyReads
        </div>
        <div style={{ fontWeight: "bold", fontSize: 30, margin: 15 }}>
          Currently Reading
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.bookWithShelves
            .filter((book) => book.shelf === "currentlyReading")
            .map((book) => (
              <Book
                shelf={book.shelf}
                key={book.id}
                title={book.title}
                id={book.id}
                image={book.imageLinks}
                authorName={book.authors[0]}
              />
            ))}
        </div>

        <div style={{ fontWeight: "bold", fontSize: 30, margin: 15 }}>
          Want to Read
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.bookWithShelves
            .filter((book) => book.shelf === "wantToRead")
            .map((book) => (
              <Book
                shelf={book.shelf}
                key={book.id}
                id={book.id}
                title={book.title}
                authorName={book.authors[0]}
                image={book.imageLinks}
              />
            ))}
        </div>
        <div style={{ fontWeight: "bold", fontSize: 30, margin: 15 }}>Read</div>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.props.bookWithShelves
            .filter((book) => book.shelf === "read")
            .map((book) => (
              <Book
                shelf={book.shelf}
                key={book.id}
                id={book.id}
                title={book.title}
                image={book.imageLinks}
                authorName={book.authors[0]}
              />
            ))}
        </div>
        <Link to="/search">
          <button
            style={{
              backgroundImage: `url("/add.svg")`,
              backgroundColor: "green",
              height: 60,
              width: 60,
              backgroundRepeat: "no-repeat",
              borderRadius: "50%",
              border: "none",
              position: "fixed",
              bottom: 30,
              right: 30,
              boxShadow: "7px 5px 19px -3px rgba(0,0,0,0.54)",
              backgroundSize: "60%",
              backgroundPosition: "center",
            }}
          />
        </Link>
      </div>
    );
  }
}
export default App;

// Given a user is on the search page
// When they type into the input
// Then a list of books with shelf buttons is displayed

// Given a user is viewing a list of books on the search page
// When the user clicks the shelf button
// Then show options: Currently reading, Want To Read, Read

// Given a user is viewing the shelf options for a book
// When the user clicks Currently Reading
// Then the book should appear in their currently reading shelf
