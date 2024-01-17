import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RecepiesList() {
  const [recepies, setRecepies] = useState([]);
  const [selectedRecepies, setSelectedRecepies] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/recepies");
      setRecepies(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/recepies/${id}`);
      setRecepies(recepies.filter((recepie) => recepie.id !== id));
    }
  };
  const handleReadMore = (recepie) => {
    setSelectedRecepies(recepie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Recepies</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="float-right">
            <Link to="/createrecepie">
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
            {recepies.map((recepie) => (
              <tr key={recepie.id}>
                <td>{recepie.id}</td>
                <td>{recepie.title}</td>
                <td>{recepie.author}</td>
                <td>{recepie.content}</td>
                <td>
                  {recepie.description.length > 150 ? (
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${recepie.description.slice(0, 150)}...`,
                        }}
                      />
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                        }}
                        onClick={() => handleReadMore(recepie)}
                      >
                        Read More
                      </button>
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: recepie.description }}
                    />
                  )}
                </td>
                <td>
                  <img
                    src={recepie.image}
                    alt=""
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{new Date(recepie.year).toLocaleDateString()}</td>
                <td>
                  <Link to={`/editrecepie/${recepie.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(recepie.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecepies?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            className="quill-editor"
            value={selectedRecepies?.description}
            readOnly={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecepiesList;
