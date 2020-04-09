import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:[],
  }

  componentDidMount(){
    this.getBooks();
  }

  clearBooks = () => {
     this.setState({
       books:[]
     })
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

 
handleFind = (value) => {
  this.setState(() => ({
    books:value
  }))
}


  changeCategory = (event) => {
    event.persist();
    BooksAPI.get(event.target.name).then((book) => {
      BooksAPI.update(book, event.target.value).then((ids) => {
        const {currentlyReading, wantToRead, read} = ids;
        const currentBooks = this.state.books.filter( temp => currentlyReading.includes(temp.id)).map(book => Object.assign({}, book, { shelf: "currentlyReading" }));
        const wantBooks = this.state.books.filter( temp => wantToRead.includes(temp.id)).map(book => Object.assign({}, book, { shelf: "wantToRead" }));
        const readBooks = this.state.books.filter( temp => read.includes(temp.id)).map(book => Object.assign({}, book, { shelf: "read" }));
        const newBooks = [...currentBooks, ...wantBooks, ...readBooks];
        this.setState({
          books: newBooks
        })
      })
    })
  }

  render() {
    return (
      <div className="app">
       
       <Route exact path="/" render={() => (
         <BookList books={this.state.books} changeCategory={this.changeCategory}/>
       )} />
       
       <Route path="/search" render={() => (
    		<SearchBook clearBooks={this.clearBooks} getBooks={this.getBooks} showBooks={this.state.books} handleFind={this.handleFind} />
    	)}/>
      
      </div>
    )
  }
}

export default BooksApp
