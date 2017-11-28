import React, {Component} from 'react'
import BookComponent from './BookComponent'
import BookSearch from './BookSearch'
    import * as BooksAPI from './BooksAPI'
import ShelfComponent from './ShelfCOmponent'
import {Link} from 'react-router-dom'

class MainComponent extends Component {
    handleBookChange(event,book) {
        this.props.handleChange(event, book);
    }
    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="currentlyReading" title="Currently Reading" books={this.props.books} />
                        <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="wantToRead" title="Want to Read" books={this.props.books} />
                        <ShelfComponent  handleChange={(event,book)=>(this.handleBookChange(event,book))} shelf="read" title="Read" books={this.props.books} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default MainComponent;