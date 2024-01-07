import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecepiesDetail =() => {
    const [recepies, setRecepies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      const fetchRecepie = async () => {
        try {
          const res = await axios.get(`/recepies/${id}`);
          setRecepies(res.data);
          console.log("recepies", res.data);
        } catch (error) {
          console.error("Error fetching recepies:", error);
        }
      };
      fetchRecepie();
    }, [id]);


    if (!recepies) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="blog-detail">
        <img src={recepies.image} alt={recepies.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{recepies.title}</h2>
          <p className="blog-content">{recepies.content}</p>
          <p className="blog-genre">Genre:{recepies.genre}</p>
        </div>
        <p className="blog-description">{recepies.description}</p>
      </div>
    );
};

export default RecepiesDetail;
