import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechDetail";

const Drinks = () => {
  const [drink, setDrink] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/drinks");
      setDrink(res.data);
      console.log("drinks", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (drinkId) => {
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
        {drink.map((drinks) => (
          <div
            key={drinks.id}
            className="book-card"
            onClick={() => handleMovieClick(drinks.id)}
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
      <div style= {{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
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
