import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
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
      console.log(this);
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.map((book, index) => {
                        if(book.shelf === "currentlyReading") {
                          return(
                            <li key={index}>
                              <BookComponent handleChange={(event)=>(this.handleBookChange(event,book))} bookParameters={book}/>
                            </li>
                          )
                        }
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.map((book, index) => {
                        if(book.shelf === "wantToRead") {
                          return(
                            <li key={index}>
                              <BookComponent handleChange={(event)=>(this.handleBookChange(event,book))} bookParameters={book}/>
                            </li>
                          )
                        }
                      })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.map((book, index) => {
                        if(book.shelf === "read") {
                          return(
                            <li key={index}>
                              <BookComponent handleChange={(event)=>(this.handleBookChange(event,book))} bookParameters={book}/>
                            </li>
                          )
                        }
                      })}
                    </ol>
                  </div>
                </div>
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
