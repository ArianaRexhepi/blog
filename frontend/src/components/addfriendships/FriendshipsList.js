import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FriendshipsList() {
  const [friendship, setFriendship] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/friendships");
      setFriendship(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/friendships/${id}`);
      setFriendship(friendship.filter((friendships) => friendships.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Friendship</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createfriendship">
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
            {friendship.map((friendships) => (
              <tr key={friendships.id}>
                <td>{friendships.id}</td>
                <td>{friendships.title}</td>
                <td>{friendships.author}</td>
                <td>{friendships.content}</td>
                
                <td>{friendships.description}</td>
                <td>
                  <img
                    src={friendships.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{friendships.year}</td>
                <td>
                  <Link to={`/editfriendship/${friendships.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(friendships.id)}
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

export default FriendshipsList;
