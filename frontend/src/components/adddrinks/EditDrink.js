import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditDrink() {
  const [loading, setLoading] = useState(false);
  const [drink, setDrink] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`drinks/${id}`).then((response) => {
      setDrink(response.data);
      console.log(response.data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await axios.put(`drinks/${id}`, drink).then(() => {
        setLoading(false);
        navigate("/drinklist");
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!drink) return <div>Loading...</div>;

  return (
    <div className="modal-dialog" style={{ width: 600, marginTop: "50px" }}>
      <div className="modal-content">
        <form className="form">
          <div className="modal-header">
            <h4 className="modal-title">Edit Drink</h4>
            <Link to="/drinklist">
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
              <label>Year:</label>
              <input
                type="text"
                className="form-control"
                value={tech.year}
                onChange={(e) => setTech({ ...tech, year: e.target.value })}
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
              <input
                type="text"
                className="form-control"
                value={tech.description}
                onChange={(e) => setTech({ ...tech, rating: e.target.value })}
              />
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
          </div>

          <div className="modal-footer">
            <Link to="/drinklist">
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

export default EditDrink;
