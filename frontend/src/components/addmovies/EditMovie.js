import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ReactQuill from "react-quill";

function EditMovie() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`movies/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setMovie(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setMovie({ ...movie, description: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`movies/${id}`, movie).then(() => {
        setLoading(false);
        navigate("/movielist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/movielist">
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
                className="form-control"
                value={movie.title}
                onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={movie.author}
                onChange={(e) => setMovie({ ...movie, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                type="text"
                className="form-control"
                value={movie.genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={movie.content}
                onChange={(e) =>
                  setMovie({ ...movie, content: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {movie && (
                <ReactQuill
                  className="quill-editor"
                  value={movie.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={movie.image}
                onChange={(e) => setMovie({ ...movie, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={movie.year}
                onChange={(e) => {
                  console.log(e.target.value);
                  setMovie({ ...movie, year: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/movielist">
              <input
                type="button"
                style={{ margin: "5px" }}
                className="btn btn-danger"
                value="Dismiss"
              />
            </Link>
            <input
              onClick={handleSubmit}
              type="submit"
              disabled={loading}
              value="Edit"
              className="btn btn-primary float-right"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
