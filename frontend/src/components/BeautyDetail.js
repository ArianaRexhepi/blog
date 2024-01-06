import axios from "axios";
import React, { useEffect, useState } from "react";

const BeautyDetail =() => {
    const [beauty, setBeauty] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/beauty");
          setBeauty(res.data);
          console.log("beauty", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {beauty.map((beauties) => (
      <div key={beauties.id} className="blog-detail">
        <img src={beauties.image} alt={beauties.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{beauties.title}</h2>
          <p className="blog-content">{beauties.content}</p>
        </div>
        <p className="blog-description">{beauties.description}</p>
      </div>
    ))}
  </div>
  );
};

export default BeautyDetail;
