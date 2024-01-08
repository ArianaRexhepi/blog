import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditFriendship() {
  const [loading, setLoading] = useState(false);
  const [friendship, setFriendship] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`friendship/${id}`).then((response) => {
      setFriendship(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`friendship/${id}`, friendship).then(() => {
        setLoading(false);
        navigate("/friendshiplist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!friendship) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/friendshiplist">
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
                value={friendship.title}
                onChange={(e) => setFriendship({ ...friendship, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={friendship.author}
                onChange={(e) => setFriendship({ ...friendship, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={friendship.content}
                onChange={(e) => setFriendship({ ...friendship, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                rows={7}
                value={friendship.description}
                onChange={(e) => setFriendship({ ...friendship, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={friendship.image}
                onChange={(e) => setFriendship({ ...friendship, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="year"
                className="form-control"
                value={friendship.year}
                onChange={(e) => setFriendship({ ...friendship, year: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Link to="/friendshiplist">
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

export default EditFriendship;
