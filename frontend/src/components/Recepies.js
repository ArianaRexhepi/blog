import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recepies = () => {
  const [recepies, setRecepies] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = recepies.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(recepies.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/recepies");
      setRecepies(res.data);
      console.log("recepies", res.data);
    };
    fetch();
  }, []);

  const handleDrinkClick = (recepieId) => {
    navigate(`/recepies/${recepieId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Recepie Ideas</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {currentBlogs.map((recepies) => (
          <div
            key={recepies.id}
            className="book-card"
            onClick={() => handleDrinkClick(recepies.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={recepies.image}
                  alt={recepies.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{recepies.title}</b>
                </h3>
                <p className="blog-content">{recepies.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{recepies.year}</div>
                <div className="author">By {recepies.author}</div>
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

export default Recepies;
