import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail =() => {
    const [movies, setMovies] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    const styles = {
      movieImage: {
        maxWidth: '100%',
        marginBottom: '10px',
      },
      commentItem: {
        marginBottom: '10px',
      },
      commentForm: {
        marginTop: '20px',
      },
      commentTextarea: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
      },
      submitButton: {
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
      },
    };

    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const res = await axios.get(`/movies/${id}`);
          setMovies(res.data);
          console.log("movie", res.data);
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      };
  
      const fetchComments = async () => {
        try {
          const res = await axios.get(`/movies/${id}/comments`);
          setComments(res.data);
          console.log("comments", res.data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
  
      fetchMovie();
      fetchComments();
    }, [id]);
  
    const handleCommentSubmit = async (e) => {
      e.preventDefault();
  
      if (newComment.trim() !== '') {
        try {
          const res = await axios.post(`/movies/${id}/comments`, {
            text: newComment,
            user: 'Anonymous', // You might have a user system to replace this with the actual username
          });
  
          // Update the comments state with the new comment
          setComments((prevComments) => [...prevComments, res.data]);
  
          // Clear the input field after submitting the comment
          setNewComment('');
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      }
    };
  
    if (!movies) {
      return <p>Loading...</p>;
    }
  
    return (
      <div className="blog-detail">
        <img src={movies.image} alt={movies.title} className="blog-image" />
        <div className="blog-info">
          <h2 className="blog-title">{movies.title}</h2>
          <p className="blog-content">{movies.content}</p>
        </div>
        <p className="blog-description">{movies.description}</p>

        <div style={styles.commentForm}>
          <hr></hr>
        <h4>Add a Comment</h4>
        <form onSubmit={handleCommentSubmit}>
          <label>
            Your Comment:
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              cols="50"
              style={styles.commentTextarea}
            />
          </label>
          <br />
          <button type="submit" style={styles.submitButton}>Submit Comment</button>
        </form>
      </div>
      </div>
    );
};

export default MovieDetail;
