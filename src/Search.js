import React from "react";
import { Book } from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      inputValue: "",
    };
  }

  async searchBooks(query) {
    console.log({ query });
    const searchResult = await BooksAPI.search(query);

    if (Array.isArray(searchResult)) {
      this.setState({
        books: searchResult,
      });
    } else
      this.setState({
        books: [],
      });
    console.log("got search", searchResult);
    //const debouncedOnChange = useMemo(() => debounce(onChange, 300), []);
  }
  onKeyUp(e) {
    // This would have the current value after hitting backspace.
    if (e.keyCode === 8) {
      console.log("delete");
      console.log(`Value after clearing input: "${e.target.value}"`);
      // Value after clearing input: ""
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
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
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
                shelf={book.shelf}
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
