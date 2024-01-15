import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VacationsList() {
  const [vacation, SetVacation] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/vacations");
      SetVacation(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/vacations/${id}`);
      SetVacation(vacation.filter((vacations) => vacations.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Vacations</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createvacation">
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
            {vacation.map((vacations) => (
              <tr key={vacations.id}>
                <td>{vacations.id}</td>
                <td>{vacations.title}</td>
                <td>{vacations.author}</td>
                <td>{vacations.content}</td>
                <td>{vacations.description}</td>
                <td>
                  <img
                    src={vacations.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(vacations.year).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editvacation/${vacations.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(vacations.id)}
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

export default VacationsList;
