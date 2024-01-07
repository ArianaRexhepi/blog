import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechDetail";

const Packing = () => {
  const [packing, setPacking] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = packing.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(packing.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/packing");
      setPacking(res.data);
      console.log("packing", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (beautyId) => {
    navigate(`/packing/${beautyId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Beauty</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {packing.map((packings) => (
          <div
            key={packings.id}
            className="book-card"
            onClick={() => handleMovieClick(packings.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={packings.image}
                  alt={packings.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{packings.title}</b>
                </h3>
                <p className="blog-content">{packings.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{packings.year}</div>
                <div className="author">By {packings.author}</div>
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

export default Packing;
