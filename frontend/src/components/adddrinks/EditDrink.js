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
        navigate("/drinkslist");
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
            <h4 className="modal-title">Edit Article</h4>
            <Link to="/drinkslist">
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
                value={drink.title}
                onChange={(e) => setDrink({ ...drink, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                className="form-control"
                value={drink.author}
                onChange={(e) => setDrink({ ...drink, author: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <input
                type="text"
                className="form-control"
                value={drink.content}
                onChange={(e) => setDrink({ ...drink, content: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                type="text"
                className="form-control"
                value={drink.description}
                rows={7}
                onChange={(e) => setDrink({ ...drink, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Image:</label>
              <input
                type="text"
                className="form-control"
                value={drink.image}
                onChange={(e) => setDrink({ ...drink, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="date"
                className="form-control"
                value={drink.year}
                onChange={(e) => setDrink({ ...drink, year: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Link to="/drinkslist">
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

export default EditDrink;
