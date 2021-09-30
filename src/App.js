import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      books: [], // object of title, author , catagorty
      search: "",
    };
  }

  searchBooks = (e)=>{
    this.setState({[e.target.name]:e.target.value
    })
  }
  submitSearchBooks
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
