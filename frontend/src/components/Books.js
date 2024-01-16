import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetail";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loadingInit, setLoadingInit] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `/books?genre=${selectedGenre}&sort=${sortOrder}`
      );
      setBooks(res.data);
      console.log("books", res.data);
    };
    fetch().finally(() => setLoadingInit(false));
  }, []);

  if (loadingInit) return "Loading...";

  const mergedMovies = (
    selectedGenre === "all"
      ? books
      : books.filter((book) => book.genre.toLowerCase() === selectedGenre)
  ).sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });


  const handleGenreChange = (genre) => {
    setCurrentPage(1); 
    setSelectedGenre(genre);
  };

  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = mergedMovies.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from(
    { length: Math.ceil(mergedMovies.length / itemsPerPage) },
    (_, index) => index + 1
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      <div className="filter-container filter-container-mobile">
      <label style={{ fontWeight: 'bold' }}>Select Genre: </label>
      <select
        className="select-element select-element-mobile"
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
      >
        <option value="all">All Genres</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="fiction">Fiction</option>
        <option value="romance">Romance</option>
      </select>

      <label style={{ fontWeight: "bold", marginLeft: "10px" }}>
          Sort Order:{" "}
        </label>
        <select
          className="select-element select-element-mobile"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
    </div>

      <div className="blog-container">
        {currentBlogs.map((book) => (
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
                <h4 className="blogg-title">
                  <b>{book.title}</b>
                </h4>
                <p className="blogg-content">{book.content}</p>
              </div>
              <div className="info-container">
                <div className="date"> Visited: {book.visitCount}
                </div>
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
