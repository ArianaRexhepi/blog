import React from "react";
import Post from "./Post";

const Home = () => {
    const Initial_article = {
        image:"",
        date:"",
        username:"",
        title:"",
        desription:""
    }
  return (
    <>
      <div className="right-section">
       <Post {...Initial_article}/>;
      </div>
      <div className="left-section">
        <h2>Most Popular Articles</h2>
        {/* Add your list of most popular articles here */}
      </div>
      </>
  );
};

export default Home;
