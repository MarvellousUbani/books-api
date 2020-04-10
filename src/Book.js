import React from 'react'

const Book = ({id, imageLinks, title, authors, shelf, changeSelect}) => (
    <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks["thumbnail"]})`}}></div>
        <div className="book-shelf-changer">
          <select name={id} onChange={changeSelect} defaultValue={shelf ? shelf : "none"}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors.map(author => <span key={author}>{author},</span> )}
    </div>
    </div>
  </li>
    
)

export default Book