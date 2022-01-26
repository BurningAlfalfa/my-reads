import React from "react";
import { Book } from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  async searchBooks(query) {
    const searchResult = await BooksAPI.search(query);

    if (searchResult && searchResult.length > 0) {
      this.setState({
        books: searchResult,
      });
    }
  }

  render() {
    console.log(this.state.books);
    return (
      <div style={{ display: "flex" }}>
        <Link to="/">
          <button
            style={{
              backgroundImage: `url("/arrow-back.svg")`,
              backgroundColor: "white",
              height: 50,
              width: 50,
              backgroundRepeat: "no-repeat",
              border: "none",
              position: "relative",
              backgroundSize: "60%",
              backgroundPosition: "center",
              display: "flex",
            }}
          />
        </Link>
        <input
          style={{
            width: "90%",
            height: 50,
            position: "relative",
          }}
          placeholder="Search by title, author "
          onChange={(event) => {
            const inputValue = event.target.value;
            this.searchBooks(inputValue);
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {this.state.books.map((book) => {
            return (
              <Book
                id={book.id}
                key={book.id}
                title={book.title}
                image={book.imageLinks}
                authors={book.authors}
              />
            );
          })}
        </div>
        {/* <input
          onChange={BooksAPI.search(query)} 
          {this.setState( ({
            booksOnDisplay: allBooks.filter((book) => book.shelf !== "none"),
          })); }
          placeholder="Search by Title, Author or Catagory"
        >
         </input> */}
      </div>
    );
  }
}
