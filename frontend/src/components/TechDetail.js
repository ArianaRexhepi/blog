import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const TechDetail =() => {
    const [tech, setTech] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      const SendVisit = async () => {
        await axios.get(`/technology/VisitCount/${id}`);
      };
      SendVisit();
    }, []);

    useEffect(() => {
      const fetchTech = async () => {
        try {
          const res = await axios.get(`/technology/${id}`);
          setTech(res.data);
          console.log("tech", res.data);
        } catch (error) {
          console.error("Error fetching tech:", error);
        }
      };
      fetchTech();
    }, [id]);
  
    if (!tech) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="blog-detail">
        <img src={tech.image} alt={tech.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{tech.title}</h2>
          <p className="blog-content">{tech.content}</p>
        </div>
        <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: tech.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
      </div>
    );
};

export default TechDetail;
