import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState(new Date());
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const books = {
    title: title,
    author: author,
    content: content,
    genre: genre,
    rating: rating,
    year: year,
    image: image,
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    await axios
      .post(`/books`, books)
      .then(() => {
        navigate("/booklist");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="modal-dialog" style={{ width: 600 }}>
      <div className="modal-content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h4 className="modal-title">Add Book</h4>
            <Link to="/booklist">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/booklist">
              <input type="button" className="btn btn-danger" value="Dismiss" />
            </Link>
            <input
              type="submit"
              value="Create"
              disabled={loading}
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
