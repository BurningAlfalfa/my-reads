import React from "react";
import { Book } from "./Book";
import * as BooksAPI from "./BooksAPI";

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
      <div>
        <input
          style={{ width: "100%", height: 40 }}
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
