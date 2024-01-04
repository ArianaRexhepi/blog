import axios from "axios";
import React, { useEffect, useState } from "react";

const GiftDetail =() => {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/giftideas");
          setGifts(res.data);
          console.log("gifts", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {gifts.map((gift) => (
      <div key={gift.id} className="blog-detail">
        <img src={gift.image} alt={gift.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{gift.title}</h2>
          <p className="blog-content">{gift.content}</p>
        </div>
        <p className="blog-description">{gift.description}</p>
      </div>
    ))}
  </div>
  );
};

export default GiftDetail;
