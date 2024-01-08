import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetail";

const Movies = () => {
  const [movies, setMovies] = useState([]);
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

  const filteredMovies =
    selectedGenre === "all"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  const handleGenreChange = (genre) => {
    setCurrentPage(1); 
    setSelectedGenre(genre);
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
      const res = await axios.get("/movies");
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
        {filteredMovies.map((movie) => (
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
