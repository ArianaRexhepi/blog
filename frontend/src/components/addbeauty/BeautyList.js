import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BeautyList() {
  const [beauty, setBeauty] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/beauty");
      setBeauty(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/beauty/${id}`);
      setBeauty(beauty.filter((beauties) => beauties.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Beauty</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createbeauty">
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
            {beauty.map((beauties) => (
              <tr key={beauties.id}>
                <td>{beauties.id}</td>
                <td>{beauties.title}</td>
                <td>{beauties.author}</td>
                <td>{beauties.content}</td>
                
                <td>{beauties.description}</td>
                <td>
                  <img
                    src={beauties.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{beauties.year}</td>
                <td>
                  <Link to={`/editbeauty/${beauties.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(beauties.id)}
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

export default BeautyList;
