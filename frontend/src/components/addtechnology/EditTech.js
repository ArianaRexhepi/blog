import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import dayjs from "dayjs";

function EditTech() {
  const [loading, setLoading] = useState(false);
  const [tech, setTech] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`technology/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setTech(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setTech({ ...tech, description: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`technology/${id}`, tech).then(() => {
        setLoading(false);
        navigate("/techlist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!tech) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/techlist">
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
                value={tech.title}
                onChange={(e) => setTech({ ...tech, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={tech.author}
                onChange={(e) => setTech({ ...tech, author: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={tech.content}
                onChange={(e) => setTech({ ...tech, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {tech && (
                <ReactQuill
                  className="quill-editor"
                  value={tech.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={tech.image}
                onChange={(e) => setTech({ ...tech, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="text"
                className="form-control"
                value={tech.year}
                onChange={(e) => setTech({ ...tech, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/techlist">
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

export default EditTech;
