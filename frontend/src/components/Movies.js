import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetail";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredMovies =
    selectedGenre === "all"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);
      

  const handleGenreChange = (genre) => {
    setCurrentPage(1); 
    setSelectedGenre(genre);
  };

  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = movies.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(movies.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/movies?genre=${selectedGenre}&sort=${sortOrder}`);
      setMovies(res.data);
      console.log("movies", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Favorite Movies</i>
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

        <label style={{ fontWeight: 'bold', marginLeft: '10px' }}>Sort Order: </label>
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
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="book-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{movie.title}</b>
                </h3>
                <p className="blog-content">{movie.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{movie.year}</div>
                <div className="author">By {movie.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"80px" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => handleClick(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                <a className="page-link" href="#" onClick={() => handleClick(number)}>
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => handleClick(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Movies;
