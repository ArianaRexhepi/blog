import axios from "axios";
import React, { useEffect, useState } from "react";
import './Books.css';

const BookDetail =() => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/books");
          setBooks(res.data);
          console.log("books", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {books.map((book) => (
      <div key={book.id} className="book-detail">
        <img src={book.image} alt={book.title} className="book-image" />
        <div className="book-info">
          <h2 className="book-title">{book.title}</h2>
          <p className="book-content">{book.content}</p>
          <p className="book-genre">Genre: {book.genre}</p>
        </div>
        <p className="book-description">{book.description}</p>
      </div>
    ))}
  </div>
  );
};

export default BookDetail;
