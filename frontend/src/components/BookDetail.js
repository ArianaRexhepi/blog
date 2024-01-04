import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <div key={book.id} className="blog-detail">
        <img src={book.image} alt={book.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{book.title}</h2>
          <p className="blog-content">{book.content}</p>
          <p className="blog-genre">Genre: {book.genre}</p>
        </div>
        <p className="blog-description">{book.description}</p>
      </div>
    ))}
  </div>
  );
};

export default BookDetail;
