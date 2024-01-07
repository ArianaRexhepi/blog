import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PackingDetail = () => {
  const [packing, setPacking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPacking = async () => {
      try {
        const res = await axios.get(`/packing/${id}`);
        setPacking(res.data);
        console.log("packing", res.data);
      } catch (error) {
        console.error("Error fetching packing:", error);
      }
    };
    fetchPacking();
  }, [id]);

  if (!packing) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={packing.image} alt={packing.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{packing.title}</h2>
        <p className="blog-content">{packing.content}</p>
      </div>
      <p className="blog-description">{packing.description}</p>
    </div>
  );
};

export default PackingDetail;
