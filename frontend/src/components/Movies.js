import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetail";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

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
          <i>Favorite movies</i>
          <hr></hr>
        </h1>
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
                <div className="date">{movie.date}</div>
                <div className="author">By {movie.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style= {{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
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
