import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GiftList() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/giftideas");
      setGifts(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/giftideas/${id}`);
      setGifts(gifts.filter((gift) => gift.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Gifts</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/creategifts">
              <button className="btn btn-primary">Create New</button>
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
            {gifts.map((gift) => (
              <tr key={gift.id}>
                <td>{gift.id}</td>
                <td>{gift.title}</td>
                <td>{gift.author}</td>
                <td>{gift.content}</td>
                <td>{gift.description}</td>
                <td>
                  <img
                    src={gift.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(gift.year).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editgifts/${gift.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(gift.id)}
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

export default GiftList;
