import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetail";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("all");

  const filterStyle = {
    marginBottom: '20px',
    marginLeft:'45px'
  };

  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    marginLeft: '10px',
  };

  const filteredBooks =
    selectedGenre === "all"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  const handleGenreChange = (genre) => {
    setCurrentPage(1); 
    setSelectedGenre(genre);
  };

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = books.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from(
    { length: Math.ceil(books.length / itemsPerPage) },
    (_, index) => index + 1
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      <div style={filterStyle}>
      <label style={{ fontWeight: 'bold' }}>Select Genre: </label>
      <select
        style={selectStyle}
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="all">All Genres</option>
        <option value="action">Action</option>
        <option value="action">Comedy</option>
        <option value="action">Drama</option>
        <option value="action">Fiction</option>
        <option value="romance">Romance</option>
      </select>
    </div>

      <div className="blog-container">
        {filteredBooks.map((book) => (
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
                <h3 className="blog-title">
                  <b>{book.title}</b>
                </h3>
                <p className="blog-content">{book.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{book.year}</div>
                <div className="author">By {book.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "80px",
        }}
      >
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={() => handleClick(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li
                className={`page-item ${
                  currentPage === number ? "active" : ""
                }`}
                key={number}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => handleClick(number)}
                >
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={() => handleClick(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Books;
