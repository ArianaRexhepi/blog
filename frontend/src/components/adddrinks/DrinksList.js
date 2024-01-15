import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DrinksList() {
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/drinks");
      setDrink(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/drinks/${id}`);
      setDrink(drink.filter((drinks) => drinks.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Drinks</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createdrink">
              <button className="btn btn-primary ">Create new</button>
            </Link>
          </div>
        </div>

        <table
          className="table table-bordered"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Description</th>
              <th>Year</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drink.map((drinks) => (
              <tr key={drinks.id}>
                <td>{drinks.id}</td>
                <td>{drinks.title}</td>
                <td>{drinks.author}</td>
                <td>{drinks.content}</td>
                <td>{drinks.description}</td>
                <td>
                  <img
                    src={drinks.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(drinks.year).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editdrink/${drinks.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(drinks.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DrinksList;
