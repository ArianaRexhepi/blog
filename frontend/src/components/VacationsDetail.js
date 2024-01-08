import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VacationDetail =() => {
    const [vacations, setVacations] = useState([]);
    const { id } = useParams();

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const res = await axios.get(`/vacations/${id}`);
        setVacations(res.data);
        console.log("vacations", res.data);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };
    fetchVacations();
  }, [id]);

  if (!vacations) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={vacations.image} alt={vacations.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{vacations.title}</h2>
        <p className="blog-content">{vacations.content}</p>
      </div>
      <p className="blog-description">{vacations.description}</p>
    </div>
  );
    

};

export default VacationDetail;
