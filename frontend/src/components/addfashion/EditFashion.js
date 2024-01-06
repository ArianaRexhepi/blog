import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditFashion() {
  const [loading, setLoading] = useState(false);
  const [fashion, setFashion] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`fashion/${id}`).then((response) => {
      setFashion(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`fashion/${id}`, fashion).then(() => {
        setLoading(false);
        navigate("/fashionlist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!fashion) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/fashionlist">
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
          <div style={{ marginTop:"5px"}}  className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={fashion.title}
                onChange={(e) => setFashion({ ...fashion, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={fashion.author}
                onChange={(e) => setFashion({ ...fashion, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="text"
                className="form-control"
                value={fashion.year}
                onChange={(e) => setFashion({ ...fashion, year: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={fashion.content}
                onChange={(e) => setFashion({ ...fashion, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                rows={7}
                value={fashion.description}
                onChange={(e) => setFashion({ ...fashion, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={fashion.image}
                onChange={(e) => setFashion({ ...fashion, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="year"
                className="form-control"
                value={fashion.year}
                onChange={(e) => setFashion({ ...fashion, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/beautylist">
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

export default EditFashion;
