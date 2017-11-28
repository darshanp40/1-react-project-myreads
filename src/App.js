import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import ShelfComponent from './ShelfCOmponent'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        {this.state.showSearchPage ? (
          <BookSearch clickHandler={() => this.setState({ showSearchPage: false }) } booksInShelf={this.state.books} handleChange={(event,book) => {this.handleBookChange(event, book)}} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="currentlyReading" title="Currently Reading" books={this.state.books} />
                <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="wantToRead" title="Want to Read" books={this.state.books} />
                <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="read" title="Read" books={this.state.books} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
