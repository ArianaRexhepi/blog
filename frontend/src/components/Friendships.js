import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Friendships = () => {
  const [friendship, setFriendship] = useState([]);
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = friendship.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(friendship.length / itemsPerPage) }, (_, index) => index + 1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/friendships");
      setFriendship(res.data);
      console.log("friendship", res.data);
    };
    fetch();
  }, []);

  const handleMovieClick = (friendshipId) => {
    navigate(`/friendships/${friendshipId}`);
  };

  return (
    <div>
      <div className="h-container">
        <br></br>
        <h1>
          <i>Friendships</i>
          <hr></hr>
        </h1>
      </div>

      <div className="blog-container">
        {friendship.map((friendships) => (
          <div
            key={friendships.id}
            className="book-card"
            onClick={() => handleMovieClick(friendships.id)}
          >
            <div className="blog-box">
              <div className="image-container">
                <img
                  src={friendships.image}
                  alt={friendships.title}
                  className="blog-image"
                />
              </div>
              <div className="text-container">
                <h3 className="blog-title">
                  <b>{friendships.title}</b>
                </h3>
                <p className="blog-content">{friendships.content}</p>
              </div>
              <div className="info-container">
                <div className="date">{friendships.year}</div>
                <div className="author">By {friendships.author}</div>
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

export default Friendships;
