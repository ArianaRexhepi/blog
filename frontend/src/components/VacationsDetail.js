import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const VacationDetail = () => {
  const [vacations, setVacations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/vacations/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

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
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: vacations.description }}
      />
      <hr />
      <DisqusComments identifier={id} />
    </div>
  );
};

export default VacationDetail;
