import axios from "axios";
import React, { useEffect, useState } from "react";

const TechDetail =() => {
    const [tech, setTech] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          const res = await axios.get("/technology");
          setTech(res.data);
          console.log("tech", res.data);
        };
        fetch();
      }, []);


  return (
    <div>
    {tech.map((techs) => (
      <div key={techs.id} className="blog-detail">
        <img src={techs.image} alt={techs.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{techs.title}</h2>
          <p className="blog-content">{techs.content}</p>
        </div>
        <p className="blog-description">{techs.description}</p>
      </div>
    ))}
  </div>
  );
};

export default TechDetail;
