import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ReactQuill from "react-quill";

function EditRecepie() {
  const [loading, setLoading] = useState(false);
  const [recepies, setRecepies] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`recepies/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setRecepies(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setRecepies({ ...recepies, description: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`recepies/${id}`, recepies).then(() => {
        setLoading(false);
        navigate("/recepielist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!recepies) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/recepielist">
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
                value={recepies.title}
                onChange={(e) => setRecepies({ ...recepies, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={recepies.author}
                onChange={(e) => setRecepies({ ...recepies, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={recepies.content}
                onChange={(e) => setRecepies({ ...recepies, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {recepies && (
                <ReactQuill
                  className="quill-editor"
                  value={recepies.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={recepies.image}
                onChange={(e) => setRecepies({ ...recepies, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={recepies.year}
                onChange={(e) => setRecepies({ ...recepies, year: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/recepielist">
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

export default EditRecepie;
