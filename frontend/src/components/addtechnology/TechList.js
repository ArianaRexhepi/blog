import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TechList() {
  const [tech, setTech] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/technology");
      setTech(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await axios.delete(`/technology/${id}`);
      setTech(tech.filter((techs) => techs.id !== id));
    }
  };
  const handleReadMore = (tech) => {
    setSelectedTech(tech);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop:"5px" }}>Tech News</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}className="float-right">
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
              <th>Content</th>
              <th>Description</th>
              <th>Image</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tech.map((techs) => (
              <tr key={techs.id}>
                <td>{techs.id}</td>
                <td>{techs.title}</td>
                <td>{techs.author}</td>
                <td>{techs.content}</td>
                <td>
                  {techs.description.length > 150 ? (
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${techs.description.slice(0, 150)}...`,
                        }}
                      />
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                        }}
                        onClick={() => handleReadMore(techs)}
                      >
                        Read More
                      </button>
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: techs.description }}
                    />
                  )}
                </td>
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
                <td>{new Date(techs.year).toLocaleDateString()}</td>
                
                <td>
                  <Link to={`/editech/${techs.id}`}>
                    <button style={{margin:"5px"}} className="btn btn-primary">Edit</button>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTech?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            className="quill-editor"
            value={selectedTech?.description}
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

export default TechList;
