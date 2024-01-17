import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleReadMore = (gift) => {
    setSelectedGifts(gift);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
                <td>
                  {gift.description.length > 150 ? (
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `${gift.description.slice(0, 150)}...`,
                        }}
                      />
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "blue",
                        }}
                        onClick={() => handleReadMore(gift)}
                      >
                        Read More
                      </button>
                    </div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: gift.description }}
                    />
                  )}
                </td>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGifts?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactQuill
            className="quill-editor"
            value={selectedGifts?.description}
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

export default GiftList;
