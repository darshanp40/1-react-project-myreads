import React, {Component} from 'react'
import BookComponent from './BookComponent'

class ShelfComponent extends Component {
    handleBookChange(event, book) {
        this.props.handleChange(event, book);
    }
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map((book, index) => {
                    if(book.shelf === this.props.shelf) {
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
        )
    }
}

export default ShelfComponent;