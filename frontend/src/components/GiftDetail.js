import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GiftDetail = () => {
  const [gift, setGift] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const res = await axios.get(`/giftideas/${id}`);
        setGift(res.data);
        console.log("gift", res.data);
      } catch (error) {
        console.error("Error fetching gift:", error);
      }
    };
    fetchGift();
  }, [id]);

  if (!gift) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={gift.image} alt={gift.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{gift.title}</h2>
        <p className="blog-content">{gift.content}</p>
      </div>
      <p className="blog-description">{gift.description}</p>
    </div>
  );
};

export default GiftDetail;
