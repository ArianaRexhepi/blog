import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GiftDetail";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/giftideas");
      setGifts(res.data);
      console.log("gifts", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (giftId) => {
    navigate(`/giftideas/${giftId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Favorite Gifts</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="book-card"
            onClick={() => handleMovieClick(gift.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{gift.title}</b>
                </h3>
                <p className="blog-content">{gift.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{gift.date}</div>
                <div className="author">By {gift.author}</div>
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

export default Gifts;
