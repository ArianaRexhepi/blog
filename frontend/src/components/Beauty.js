import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechDetail";

const Beauty = () => {
  const [beauty, setBeauty] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/beauty");
      setBeauty(res.data);
      console.log("beauty", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (beautyId) => {
    navigate(`/beauty/${beautyId}`);
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
        {beauty.map((beauties) => (
          <div
            key={beauties.id}
            className="book-card"
            onClick={() => handleMovieClick(beauties.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={beauties.image}
                  alt={beauties.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{beauties.title}</b>
                </h3>
                <p className="blog-content">{beauties.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{beauties.year}</div>
                <div className="author">By {beauties.author}</div>
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

export default Beauty;
