import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const FriendshipsDetail = () => {
  const [friendship, setFriendship] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const SendVisit = async () => {
      await axios.get(`/friendships/VisitCount/${id}`);
    };
    SendVisit();
  }, []);

  useEffect(() => {
    const fetchFriendship = async () => {
      try {
        const res = await axios.get(`/friendships/${id}`);
        setFriendship(res.data);
        console.log("friendship", res.data);
      } catch (error) {
        console.error("Error fetching friendship:", error);
      }
    };
    fetchFriendship();
  }, [id]);

  if (!friendship) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail">
      <img src={friendship.image} alt={friendship.title} className="blog-image" />
      <div className="blog-info">
        <h2 className="blog-title">{friendship.title}</h2>
        <p className="blog-content">{friendship.content}</p>
      </div>
      <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: friendship.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
    </div>
  );
};

export default FriendshipsDetail;
