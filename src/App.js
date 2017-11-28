import React from 'react'
import {Route} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import MainComponent from './MainComponent'
class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then((response) => {
      this.setState({books: response})
    });
  }
  handleBookChange(event, book) {
    BooksAPI.update(book, event.target.value).then(() => {
      this.getBooks()
    });
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<MainComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} books={this.state.books} />)}/>
        <Route exact path="/search" render={({history}) => (<BookSearch booksInShelf={this.state.books} handleChange={(event,book) => {this.handleBookChange(event, book)}} />)}/>
      </div>
    )
  }
}

export default BooksApp
