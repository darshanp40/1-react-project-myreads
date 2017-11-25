import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'

class BookSearch extends Component {
    state = {
        searchText: "",
        books:[]
    }
    searchBook = (event) => {
        var searchText = event.target.value;
        if (searchText.length !== 0) {
            BooksAPI.search(searchText, 5).then((response) => {
            if (response.length > 0) {
                //response = this.changeBookShelf(response);
                console.log(response);
                this.setState({
                    books: response
                }); 
            }
            });
        } else {
            this.setState(
                {
                    books: [], 
                    query: ''
                }
            );
        }
    }
    changeBookShelf = function() {

    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.clickHandler}>Close</a>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" onChange={this.searchBook} placeholder="Search by title or author" value={this.state.searchText} /> 
    
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book, index) => {
                            return(
                                <li key={index}>
                                <BookComponent handleChange={(event)=>(this.handleBookChange(event,book))} bookParameters={book}/>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
    
}

export default BookSearch;