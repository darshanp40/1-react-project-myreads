import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookComponent from './BookComponent'

class BookSearch extends Component {
    state = {
        searchText: "",
        books:[],
        booksInShelf: []
    }
    searchBook = (event) => {
        var searchText = event.target.value;

        this.setState({
            searchText: searchText
        });

        if (searchText.length !== 0) {
            BooksAPI.search(searchText, 5).then((response) => {
            var booksInResponse = response, index, shelfIndex;
            if (response.length > 0) {
                for (index = 0; index < booksInResponse.length; index++) {
                    booksInResponse[index].shelf = "none";
                }
                for (index = 0; index < booksInResponse.length; index++) {
                    for (shelfIndex = 0; shelfIndex < this.props.booksInShelf.length; shelfIndex++) {
                       // booksInResponse[index].shelf = "none";
                        if(booksInResponse[index].id === this.props.booksInShelf[shelfIndex].id) {
                            booksInResponse[index].shelf = this.props.booksInShelf[shelfIndex].shelf;
                        }
                    }
                }
                console.log(booksInResponse);
                this.setState({
                    books: booksInResponse
                }); 
            }
            });
        } else {
            this.setState(
                {
                    books: [], 
                    searchText: ''
                }
            );
        }
    }
    handleBookChange(event, book) {
        this.props.handleChange(event, book);
        if(event.target.value.toLowerCase() !== "none"){
            this.setState(() => {
                books: this.state.books.filter((value) =>{return(value.title !== book.title)})
            });
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
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