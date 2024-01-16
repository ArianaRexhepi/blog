import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const DrinksDetail =() => {
    const [drinks, setDrinks] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      const SendVisit = async () => {
        await axios.get(`/drinks/VisitCount/${id}`);
      };
      SendVisit();
    }, []);

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
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: drinks.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
    </div>
  );
    

};

export default DrinksDetail;
