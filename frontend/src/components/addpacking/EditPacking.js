import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditPacking() {
  const [loading, setLoading] = useState(false);
  const [packing, setPacking] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`packing/${id}`).then((response) => {
      setPacking(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`packing/${id}`, packing).then(() => {
        setLoading(false);
        navigate("/packinglist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!packing) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/beautylist">
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
                value={packing.title}
                onChange={(e) => setPacking({ ...packing, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={packing.author}
                onChange={(e) => setPacking({ ...packing, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={packing.content}
                onChange={(e) => setPacking({ ...packing, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                rows={7}
                value={packing.description}
                onChange={(e) => setPacking({ ...packing, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={packing.image}
                onChange={(e) => setPacking({ ...packing, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="year"
                className="form-control"
                value={packing.year}
                onChange={(e) => setPacking({ ...packing, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/packinglist">
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

export default EditPacking;
