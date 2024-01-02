import React, { useEffect, useState } from "react";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookDetail from "./BookDetail"; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/books");
      setBooks(res.data);
      console.log("books", res.data);
    };
    fetch();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Favorite Books</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleBookClick(book.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img src={book.image} alt={book.title} className="blog-image" />
              </div>
              <div className="text-container">
                <h3 className="blog-title"><b>{book.title}</b></h3>
                <p className="blog-content">{book.content.slice(0, 109)}...</p>
              </div>
              <div className="info-container">
                <div className="date">{book.date}</div>
                <div className="author">By {book.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
