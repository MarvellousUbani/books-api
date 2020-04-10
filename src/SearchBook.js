import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component{

    state = {
      show: false
    }
    
      componentWillUnmount(){
        this.props.getBooks();
      }
    
     findBook = (query) => {
        BooksAPI.search(query).then((book) => {
          if(!Array.isArray(book)  || query === ""){
            this.setState({show:false})
          }
          else{
           this.setState({show:true})
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
  const {show} = this.state
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
                <input type="text" onChange={(event) => this.findBook(event.target.value)}  placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
          {show === true && (     
            showBooks.filter( book => book.authors && book.imageLinks && book.imageLinks["thumbnail"]).map(({id, ...otherItemProps}) => 
                <Book key={id}{...otherItemProps} id={id} changeSelect={this.changeSelect}/>
                )
            )}
				</ol>
            </div>
          </div>
    )
  }
}

export default SearchBook