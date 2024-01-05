import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/books");
      setBooks(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmed) {
      await axios.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop:"5px"}}>Books</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="float-right">
            <Link to="/createbook">
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
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.content}</td>
                <td>{book.description}</td>
                <td>{book.year}</td>
                <td>
                  <img
                    src={book.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <Link to={`/editbook/${book.id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(book.id)}
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

export default BookList;
