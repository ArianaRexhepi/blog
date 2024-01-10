import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './VacationsDetail'

const Vacations = () => {
  const [vacation, SetVacation] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = vacation.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(vacation.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/vacations");
      SetVacation(res.data);
      console.log("vacations", res.data);
    };
    fetch();
  }, []);

  const handleVacationClick = (vacationId) => {
    navigate(`/vacations/${vacationId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Family Vacation Suggestions</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {vacation.map((vacations) => (
          <div
            key={vacations.id}
            className="book-card"
            onClick={() => handleVacationClick(vacations.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={vacations.image}
                  alt={vacations.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{vacations.title}</b>
                </h3>
                <p className="blog-content">{vacations.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{vacations.year}</div>
                <div className="author">By {vacations.author}</div>
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

export default Vacations;
