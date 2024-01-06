import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DrinksDetail =() => {
    const [drinks, setDrinks] = useState([]);
    const { id } = useParams();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const res = await axios.get(`/drinks/${id}`);
        setDrinks(res.data);
        console.log("drinks", res.data);
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };
    fetchDrinks();
  }, [id]);

  if (!drinks) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={drinks.image} alt={drinks.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{drinks.title}</h2>
        <p className="blog-content">{drinks.content}</p>
      </div>
      <p className="blog-description">{drinks.description}</p>
    </div>
  );
    

};

export default DrinksDetail;
