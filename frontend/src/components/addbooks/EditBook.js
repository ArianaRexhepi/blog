import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`books/${id}`).then((response) => {
        setBook(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`books/${id}`, book).then(() => {
        setLoading(false);
        navigate("/booklist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/booklist">
               <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div style={{ marginTop:"5px"}} className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Genre:</label>
              <input
                type="text"
                className="form-control"
                value={book.genre}
                onChange={(e) => setBook({ ...book, genre: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={book.content}
                onChange={(e) => setBook({ ...book, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                value={book.description}
                rows={7}
                onChange={(e) => setBook({ ...book, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={book.image}
                onChange={(e) => setBook({ ...book, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="year"
                className="form-control"
                value={book.year}
                onChange={(e) => setBook({ ...book, year: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/booklist">
              <input type="button" style={{ margin:"5px"}}className="btn btn-danger" value="Dismiss" />
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

export default EditBook;
