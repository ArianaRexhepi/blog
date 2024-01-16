import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisqusComments from "./DisqusComments";

const BookDetail =() => {
    const [books, setBooks] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      const fetchBook = async () => {
        try {
          const res = await axios.get(`/books/${id}`);
          setBooks(res.data);
          console.log("books", res.data);
        } catch (error) {
          console.error("Error fetching beauty:", error);
        }
      };
      fetchBook();
    }, [id]);

    if (!books) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="blog-detail">
        <img src={books.image} alt={books.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{books.title}</h2>
          <p className="blog-content">{books.content}</p>
          </div>
          <div
        className="blog-description"
        dangerouslySetInnerHTML={{ __html: books.description }}
      />
      <hr/>
      <DisqusComments identifier={id} />
      </div>
    );
};

export default BookDetail;
