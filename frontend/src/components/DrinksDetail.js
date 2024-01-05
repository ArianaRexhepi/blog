import axios from "axios";
import React, { useEffect, useState } from "react";

const DrinksDetail =() => {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/drinks");
          setDrinks(res.data);
          console.log("drinks", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {drinks.map((drink) => (
      <div key={drink.id} className="blog-detail">
        <img src={drink.image} alt={drink.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{drink.title}</h2>
          <p className="blog-content">{drink.content}</p>
        </div>
        <p className="blog-description">{drink.description}</p>
      </div>
    ))}
  </div>
  );
};

export default DrinksDetail;
