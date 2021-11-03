import "./App.css";
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI';
//export default class Searchbar extends React.Component
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      books: [], // object of title, author , catagorty
      query: "",
      booksOnDisplay: [],
    };
  }
  
  searchBooks = (e)=>{
    this.setState({[e.target.name]:e.target.value
    })
  }
  submitSearch=(event)=>{
    event.preventDefault();
    this.props.filterBySearchTerm(this.state.searchTerm)
    this.setState({
    searchTerm: ""
    })
  }
  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
    	booksOnDisplay: allBooks.filter(book => book.shelf !== 'none')
	  })
  	})
  }

  updateQuerey(query){
    this.setState({query})
  }

 searchBooks(query){
   
 }

  render() {
  return (
  <div>
    <input onChange={this.searchBooks} defaultValue={this.submitSearch}></input>
  </div>
  );
  }
}

export default App;



