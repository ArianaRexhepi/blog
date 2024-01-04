import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieDetail =() => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/movies");
          setMovies(res.data);
          console.log("movies", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {movies.map((movie) => (
      <div key={movie.id} className="blog-detail">
        <img src={movie.image} alt={movie.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{movie.title}</h2>
          <p className="blog-content">{movie.content}</p>
          <p className="blog-genre">Genre: {movie.genre}</p>
        </div>
        <p className="blog-description">{movie.description}</p>
      </div>
    ))}
  </div>
  );
};

export default MovieDetail;
