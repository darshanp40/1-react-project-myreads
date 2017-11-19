import React from 'react'

const BookComponent = (props) => 
(
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
            width: 128,
            height:193,
            backgroundImage: 'url("' + props.bookParameters.imageLinks.smallThumbnail + '")'
            }}></div>
            <div className="book-shelf-changer">
            <select value={props.bookParameters.shelf} onChange={props.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{props.bookParameters.title}</div>
        <div className="book-authors">{props.bookParameters.authors.join(", ")}</div>
    </div>
);

export default BookComponent;