import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail =() => {
    const [movies, setMovies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const res = await axios.get(`/movies/${id}`);
          setMovies(res.data);
          console.log("movies", res.data);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };
      fetchMovies();
    }, [id]);
  
    if (!movies) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="blog-detail">
        <img src={movies.image} alt={movies.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{movies.title}</h2>
          <p className="blog-content">{movies.content}</p>
        </div>
        <p className="blog-description">{movies.description}</p>
      </div>
    );
};

export default MovieDetail;
