import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DatingList() {
  const [dating, setDating] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/dating");
      setDating(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/beauty/${id}`);
      setDating(dating.filter((datings) => datings.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Dating News</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createdating">
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
            {dating.map((datings) => (
              <tr key={datings.id}>
                <td>{datings.id}</td>
                <td>{datings.title}</td>
                <td>{datings.author}</td>
                <td>{datings.content}</td>
                
                <td>{datings.description}</td>
                <td>
                  <img
                    src={datings.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{datings.year}</td>
                <td>
                  <Link to={`/editdating/${datings.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(datings.id)}
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

export default DatingList;
