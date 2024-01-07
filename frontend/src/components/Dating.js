import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechDetail";

const Dating = () => {
  const [dating, setDating] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = dating.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(dating.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/dating");
      setDating(res.data);
      console.log("dating", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (datingId) => {
    navigate(`/dating/${datingId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Dating Tips</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {dating.map((datings) => (
          <div
            key={datings.id}
            className="book-card"
            onClick={() => handleMovieClick(datings.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={datings.image}
                  alt={datings.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{datings.title}</b>
                </h3>
                <p className="blog-content">{datings.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{datings.year}</div>
                <div className="author">By {datings.author}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"80px" }}>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => handleClick(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageNumbers.map((number) => (
              <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                <a className="page-link" href="#" onClick={() => handleClick(number)}>
                  {number}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => handleClick(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dating;
