import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Drinks = () => {
  const [drink, setDrink] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = drink.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(drink.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/drinks");
      setDrink(res.data);
      console.log("drinks", res.data);
    };
    fetch();
  }, []);

  const handleDrinkClick = (drinkId) => {
    navigate(`/drinks/${drinkId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Drink Ideas</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {currentBlogs.map((drinks) => (
          <div
            key={drinks.id}
            className="book-card"
            onClick={() => handleDrinkClick(drinks.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={drinks.image}
                  alt={drinks.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{drinks.title}</b>
                </h3>
                <p className="blog-content">{drinks.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{drinks.year}</div>
                <div className="author">By {drinks.author}</div>
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

export default Drinks;
