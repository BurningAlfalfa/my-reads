import React from "react";
import { Book } from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedBooks: [],
      inputValue: "",
    };
  }

  async searchBooks(query) {
    console.log({ query });
    const searchResult = await BooksAPI.search(query);

    if (Array.isArray(searchResult)) {
      this.setState({
        searchedBooks: searchResult,
      });
    } else
      this.setState({
        searchedBooks: [],
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
    console.log(this.state.searchedBooks);
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
          {this.state.searchedBooks.map((book) => {
            const matchingBook = this.props.bookWithShelves.find(
              (element) => element.id === book.id
            );
            let bookShelf;
            if (matchingBook) {
              bookShelf = matchingBook.shelf;
            }

            return (
              <Book
                shelf={bookShelf}
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
            bookWithShelves: allBooks.filter((book) => book.shelf !== "none"),
          })); }
          placeholder="Search by Title, Author or Catagory"
        >
         </input> */}
      </div>
    );
  }
}
/*We want to show which shelf a book is on in the search page
- To do this we need to set the select value in Book
- We already expect the value of each book's shelf by using the prop in Book, this.props.shelf
- We get this prop value when we render a Book element like this: <Book shelf={bookShelf} />
- We render our Book elements in the search page in the map function
- We need to determine the value of bookShelf where we render our Book element, which is in the map function on the search page
- We can determine the value of bookShelf by searching our books array with shelf properties we got by using getAll in App
- To use the result of getAll in Search we pass it down as props to Search by doing <Search bookWithShelves={this.state.bookWithShelves} /> where we render Search, which is in App
- We search the array this.props.bookWithShelves where we render the Book elements in Search by using the array method find
- array method find outputs a variable which is of type the elements of the array, in our case we're using find on an array of books so find will output a variable of type book
- array method find input is a function that returns a boolean; it's an iterative function like map and filter as in the function is called once for every element in the array
- the input of any function is everything between the parentheses ex: someFunc(inputHere) 
- the find example is const found = array1.find(element => element > 10); 
therefore the input looks like this element => element > 10
- we can adapt the example, element => boolean ; true if the element matches the criteria, false if the element does not match the criteria
- the examples criteria is, find an element that has a value greater than 10
- our criteria is, find an element that matches the book object's id, book.id
- once we find the element in the array of books with shelf data, we want to use the shelf property to pass as a prop in Book
- find will return a book object, to access an object's property we do object.propertyName, in our case book.shelf
- to capture the return of a function, we store it in a variable like const outputOfFunc = myFunc(input)
- find returns a book object so we store the result of find like const matchingBook = ...find(...)
- we retrieve the book's shelf property by doing const bookShelf = matchingBook.shelf
- finally we can use the result of the book's shelf as a prop in Book to achieve our goal: <Book shelf={matchingBook}
- your goal now is to determine the input of the find function and put it all together*/
