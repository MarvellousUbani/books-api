import React from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

const BookList = ({books, changeCategory}) => (
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
      				{books.filter(book => book["shelf"] === "currentlyReading").map(({id, ...otherItemProps}) => 
                        <Book key={id}{...otherItemProps} id={id} changeSelect={changeCategory}/>
                    )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                       {books.filter(book => book["shelf"] === "wantToRead").map(({id, ...otherItemProps}) => 
                        <Book key={id}{...otherItemProps} id={id} changeSelect={changeCategory}/>
                    )}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter(book => book["shelf"] === "read").map(({id, ...otherItemProps}) => 
                        <Book key={id}{...otherItemProps} id={id} changeSelect={changeCategory}/>
                    )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
			  <Link to="/search">Add a book </Link>
            </div>
          </div>
)

export default BookList