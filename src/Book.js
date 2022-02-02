import React from "react";
import * as BooksAPI from "./BooksAPI";
export class Book extends React.Component {
  constructor(props) {
    super(props);
    this.changeShelf = this.changeShelf.bind(this);
    {
      this.state = {
        selectedValue: "",
      };
    }
  }
  async changeShelf(value) {
    console.log({ value });
    await BooksAPI.update({ id: this.props.id }, value);
    const book = await BooksAPI.get(this.props.id);
    console.log(book);
  }
  render() {
    console.log(this.props.title, this.props.shelf);
    return (
      <div>
        <div style={{ margin: 20, width: 130 }}>
          {/* <img src={this.props.bookImage} /> */}
          {this.props.image && <img src={this.props.image.thumbnail} />}

          <div style={{ fontSize: 18 }}>{this.props.title}</div>
          {this.props.authors &&
            this.props.authors.map((author) => {
              return <div key={author}>{author}</div>;
            })}
          <div
            style={{
              backgroundImage: `url("/arrow-drop-down.svg")`,
              backgroundColor: "green",
              displayEmpty: "false",
              height: 60,
              width: 60,
              backgroundRepeat: "no-repeat",
              borderRadius: "50%",
              border: "none",
              boxShadow: "7px 5px 19px -3px rgba(0,0,0,0.54)",
              backgroundSize: "60%",
              backgroundPosition: "center",
            }}
          >
            <select
              onChange={(e) => this.changeShelf(e.target.value)}
              value={this.props.shelf}
              style={{
                height: 60,
                opacity: 0,
                width: 60,
              }}
            >
              <option style={{ backgroundColor: "white" }} value="move">
                Move to...
              </option>
              <option
                style={{ backgroundColor: "white" }}
                value="currentlyReading"
              >
                Currently Reading
              </option>
              <option style={{ backgroundColor: "white" }} value="wantToRead">
                Want to Read
              </option>
              <option style={{ backgroundColor: "white" }} value="read">
                Read
              </option>
              <option style={{ backgroundColor: "white" }} value="none">
                None
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

// if a component is rendering a variable and it doesn't control updating/setting the variable value, it's a prop
// if a component is rendering a variable and it does control updating/setting the variable value, it's a state
// separation of responsibilities
