// Post.js
import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';

const Post = ({ image, date, username, title, description }) => {
  return (
    <div className="post-container">
      <img className="post-image" src={image} alt="Post Image" />
      <div className="post-details">
        <p className="post-date">Date: {date}</p>
        <p className="post-username">Username: {username}</p>
        <h2 className="post-title">{title}</h2>
        <p className="post-description">{description}</p>
        <button className="continue-reading-btn">Continue Reading</button>
      </div>
    </div>
  );
};

Post.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Post;
