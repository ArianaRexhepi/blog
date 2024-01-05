import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TechList() {
  const [tech, setTech] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/technology");
      setTech(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (confirmed) {
      await axios.delete(`/technology/${id}`);
      setBooks(tech.filter((techs) => techs.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Tech News</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="float-right">
            <Link to="/createtech">
              <button className="btn btn-primary">Create new</button>
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
              <th>Genre</th>
              <th>Content</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tech.map((techs) => (
              <tr key={techs.id}>
                <td>{techs.id}</td>
                <td>{techs.title}</td>
                <td>{techs.author}</td>
                <td>{techs.genre}</td>
                <td>{techs.content}</td>
                <td>{techs.desription}</td>
                <td>{techs.year}</td>
                <td>
                  <img
                    src={techs.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <Link to={`/editech/${techs.id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(techs.id)}
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

export default TechList;
