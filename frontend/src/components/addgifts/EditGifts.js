import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import dayjs from "dayjs";

function EditGifts() {
  const [loading, setLoading] = useState(false);
  const [gift, setGift] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`giftideas/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setGift(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setGift({ ...gift, description: value });
  };

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
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/giftlist">
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
                value={gift.title}
                onChange={(e) => setGift({ ...gift, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={gift.author}
                onChange={(e) => setGift({ ...gift, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={gift.content}
                onChange={(e) => setGift({ ...gift, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {gift && (
                <ReactQuill
                  className="quill-editor"
                  value={gift.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={gift.image}
                onChange={(e) => setGift({ ...gift, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={gift.year}
                onChange={(e) => setGift({ ...gift, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/giftlist">
              <input type="button" style={{margin:"5px"}} className="btn btn-danger" value="Dismiss" />
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
