import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DatingDetail = () => {
  const [dating, setDating] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBeauty = async () => {
      try {
        const res = await axios.get(`/dating/${id}`);
        setDating(res.data);
        console.log("dating", res.data);
      } catch (error) {
        console.error("Error fetching beauty:", error);
      }
    };
    fetchBeauty();
  }, [id]);

  if (!dating) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={dating.image} alt={dating.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{dating.title}</h2>
        <p className="blog-content">{dating.content}</p>
      </div>
      <p className="blog-description">{dating.description}</p>
    </div>
  );
};

export default DatingDetail;
