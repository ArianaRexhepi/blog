import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FashionList() {
  const [fashion, setFashion] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/fashion");
      setFashion(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/fashion/${id}`);
      setFashion(fashion.filter((fashions) => fashions.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Fashion</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createfashion">
              <button className="btn btn-primary ">Create New</button>
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
              <th>Image</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fashion.map((fashions) => (
              <tr key={fashions.id}>
                <td>{fashions.id}</td>
                <td>{fashions.title}</td>
                <td>{fashions.author}</td>
                <td>{fashions.content}</td>               
                <td>{fashions.description}</td>
                <td>
                  <img
                    src={fashions.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(fashions.year).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editfashion/${fashions.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(fashions.id)}
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

export default FashionList;
