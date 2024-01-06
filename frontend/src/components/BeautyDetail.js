import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BeautyDetail = () => {
  const [beauty, setBeauty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBeauty = async () => {
      try {
        const res = await axios.get(`/beauty/${id}`);
        setBeauty(res.data);
        console.log("beauty", res.data);
      } catch (error) {
        console.error("Error fetching beauty:", error);
      }
    };
    fetchBeauty();
  }, [id]);

  if (!beauty) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={beauty.image} alt={beauty.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{beauty.title}</h2>
        <p className="blog-content">{beauty.content}</p>
      </div>
      <p className="blog-description">{beauty.description}</p>
    </div>
  );
};

export default BeautyDetail;
