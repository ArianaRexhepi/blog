import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";
import ReactQuill from "react-quill";

const MovieDetail = () => {
  const [movies, setMovies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/movies/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovies(res.data);
        console.log("movie", res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
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
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: movies.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
    </div>
  );
};

export default MovieDetail;
