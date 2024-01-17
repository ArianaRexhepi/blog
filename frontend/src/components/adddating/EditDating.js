import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import dayjs from "dayjs";

function EditDating() {
  const [loading, setLoading] = useState(false);
  const [dating, setDating] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`dating/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setDating(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setDating({ ...dating, description: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`dating/${id}`, dating).then(() => {
        setLoading(false);
        navigate("/datinglist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!dating) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/datinglist">
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
                value={dating.title}
                onChange={(e) => setDating({ ...dating, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={dating.author}
                onChange={(e) => setDating({ ...dating, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={dating.content}
                onChange={(e) => setDating({ ...dating, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {dating && (
                <ReactQuill
                  className="quill-editor"
                  value={dating.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={dating.image}
                onChange={(e) => setDating({ ...dating, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={dating.year}
                onChange={(e) => setDating({ ...dating, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/datinglist">
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

export default EditDating;
