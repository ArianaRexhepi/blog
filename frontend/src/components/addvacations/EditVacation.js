import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import ReactQuill from "react-quill";

function EditVacation() {
  const [loading, setLoading] = useState(false);
  const [vacation, setVacation] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`vacations/${id}`).then((response) => {
      response.data.year = dayjs(response.data.year).format("YYYY-MM-DD");
      setVacation(response.data);
    });
  }, [id]);

  const handleDescriptionChange = (value) => {
    setVacation({ ...vacation, description: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`vacations/${id}`, vacation).then(() => {
        setLoading(false);
        navigate("/vacationslist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!vacation) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/vacationslist">
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
                value={vacation.title}
                onChange={(e) => setVacation({ ...vacation, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={vacation.author}
                onChange={(e) => setVacation({ ...vacation, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={vacation.content}
                onChange={(e) => setVacation({ ...vacation, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              {vacation && (
                <ReactQuill
                  className="quill-editor"
                  value={vacation.description}
                  onChange={handleDescriptionChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={vacation.image}
                onChange={(e) => setVacation({ ...vacation, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={vacation.year}
                onChange={(e) => setVacation({ ...vacation, year: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/vacationslist">
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

export default EditVacation;
