import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component{
    
    state = {
      value: ''
    }
  
    componentWillUnmount(){
   	 this.props.getBooks();
  	}
  
   findBook = (query) => {
      this.setState({value:query})
      BooksAPI.search(query).then((book) => {
        if(!Array.isArray(book)  || query === ""){
          this.props.clearBooks();
        }
        else{
         this.props.handleFind(book)
        }

      })
   }

    changeSelect = (event) => {
      event.persist();
      BooksAPI.get(event.target.name).then((book) => {
        BooksAPI.update(book, event.target.value)
      })
    }
  
  render(){
	const {showBooks} = this.props
    
    return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.value} onChange={(event) => this.findBook(event.target.value)}  placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
       {/* {this.state.value !== "" && ( */}
				{showBooks.filter( book => book.authors && book.imageLinks["thumbnail"]).map((book) => 
                  <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks["thumbnail"] || ""})` }}></div>
                            <div className="book-shelf-changer">
                              <select name={book.id} onChange={this.changeSelect} defaultValue={book.shelf ? book.shelf : "none"}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
							{book.authors.map(author => <span key={author}>{author},</span> ) || ""}
						</div>
                        </div>
                      </li>
                )}
              {/* )} */}
				</ol>
            </div>
          </div>
    )
  }
}

export default SearchBook