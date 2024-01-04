import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditGifts() {
  const [loading, setLoading] = useState(false);
  const [gift, setGift] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`giftideas/${id}`).then((response) => {
      setGift(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`giftideas/${id}`, gift).then(() => {
        setLoading(false);
        navigate("/giftlist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!gift) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Gift</h4>
            <Link to="/booklist">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
            </Link>
          </div>
          <div className="modal-body">
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
              <input
                type="text"
                className="form-control"
                value={book.description}
                onChange={(e) => setBook({ ...book, rating: e.target.value })}
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
          </div>

          <div className="modal-footer">
            <Link to="/booklist">
              <input type="button" className="btn btn-dark" value="Dismiss" />
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

export default EditGifts;
