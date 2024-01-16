import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FashionDetail";

const Fashion = () => {
  const [fashion, setFashion] = useState([]);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("newest");
  const [loadingInit, setLoadingInit] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/fashion?sort=${sortOrder}`);
      setFashion(res.data);
      console.log("fashion", res.data);
    };
    fetch().finally(() => setLoadingInit(false));
  }, []);

  if (loadingInit) return "Loading...";

  const sort = fashion.slice().sort((a, b) => {
    const dateA = new Date(a.year);
    const dateB = new Date(b.year);

    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
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

  const handleFashionClick = (fashionId) => {
    navigate(`/fashion/${fashionId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Fashion</i>
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
        {currentBlogs.map((fashions) => (
          <div
            key={fashions.id}
            className="book-card"
            onClick={() => handleFashionClick(fashions.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={fashions.image}
                  alt={fashions.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{fashions.title}</b>
                </h3>
                <p className="blog-content">{fashions.content}</p>
              </div>
              <div className="info-container">
              <div className="date">Encountered:{fashions.visitCount}</div>
                <div className="author">By {fashions.author}</div>
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

export default Fashion;
