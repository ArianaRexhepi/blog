import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TechDetail";

const Tech = () => {
  const [tech, setTech] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/techbology");
      setTech(res.data);
      console.log("tech", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (techId) => {
    navigate(`/technology/${techId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Latest Tech News</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {tech.map((techs) => (
          <div
            key={techs.id}
            className="book-card"
            onClick={() => handleMovieClick(techs.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={techs.image}
                  alt={techs.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{techs.title}</b>
                </h3>
                <p className="blog-content">{techs.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{techs.year}</div>
                <div className="author">By {techs.author}</div>
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

export default Tech;
