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
    const filteredArray = this.books.filter(element => element.includes(this.query))
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
  BooksAPI.search(query).then((results)=>{
    if(results && results.length > 0) {
        let searchResults = results;
        searchResults.map((book) => book.shelf ="none")
        this.state.search.map((book) => {
          
        })
    }
  })
   
 }

  render() {
  return (
  <div>
    <input onChange={this.filteredArray} defaultValue={this.state.query}></input>
    <button onClick ={this.filteredArray}>Search</button>
  </div>
  );
  }
}

export default App;



