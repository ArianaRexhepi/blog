import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const DatingDetail = () => {
  const [dating, setDating] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/dating/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

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
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: dating.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
    </div>
  );
};

export default DatingDetail;
