import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GiftDetail";

const Gifts = () => {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [loadingInit, setLoadingInit] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/giftideas?sort=${sortOrder}`);
      setGifts(res.data);
      console.log("gifts", res.data);
    };
    fetch().finally(() => setLoadingInit(false));
  }, []);

  if (loadingInit) return "Loading...";

  const sort = gifts.slice().sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);

    return sortOrder === "newest" ? dateA - dateB :  dateB - dateA;
  });

  const handleSortOrderChange = (selectedValue) => {
    setSortOrder(selectedValue);
  };

  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = sort.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(sort.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGiftClick = (giftId) => {
    navigate(`/giftideas/${giftId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Gift Ideas</i>
          <hr></hr>
        </h1>
      </div>
      
      <div className="filter-container filter-container-mobile">
        <label style={{ fontWeight: "bold", marginLeft: "10px" }}>
          Sort Order:{" "}
        </label>
        <select
          className="select-element select-element-mobile"
          value={sortOrder}
          onChange={(e) => handleSortOrderChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="blog-container">
        {currentBlogs.map((gift) => (
          <div
            key={gift.id}
            className="book-card"
            onClick={() => handleGiftClick(gift.id)}
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
                <h4 className="blogg-title">
                  <b>{gift.title}</b>
                </h4>
                <p className="blogg-content">{gift.content}</p>
              </div>
              <div className="info-container">
              <div className="date">Encountered:{gift.visitCount}</div>
                <div className="author">By {gift.author}</div>
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

export default Gifts;
