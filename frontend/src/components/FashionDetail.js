import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const FashionDetail = () => {
  const [fashion, setFashion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/fashion/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

  useEffect(() => {
    const fetchBeauty = async () => {
      try {
        const res = await axios.get(`/fashion/${id}`);
        setFashion(res.data);
        console.log("fashion", res.data);
      } catch (error) {
        console.error("Error fetching beauty:", error);
      }
    };
    fetchBeauty();
  }, [id]);

  if (!fashion) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={fashion.image} alt={fashion.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{fashion.title}</h2>
        <p className="blog-content">{fashion.content}</p>
      </div>
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: fashion.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
    </div>
  );
};

export default FashionDetail;
