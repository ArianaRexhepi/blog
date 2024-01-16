import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const BeautyDetail = () => {
  const [beauty, setBeauty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/beauty/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

  useEffect(() => {
    const fetchBeauty = async () => {
      try {
        const res = await axios.get(`/beauty/${id}`);
        setBeauty(res.data);
        console.log("beauty", res.data);
      } catch (error) {
        console.error("Error fetching beauty:", error);
      }
    };
    fetchBeauty();
  }, [id]);

  if (!beauty) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={beauty.image} alt={beauty.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{beauty.title}</h2>
        <p className="blog-content">{beauty.content}</p>
      </div>
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: beauty.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
      </div>
  );
};

export default BeautyDetail;
