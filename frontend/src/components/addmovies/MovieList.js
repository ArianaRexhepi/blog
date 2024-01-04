import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/movies');
      setMovies(res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      await axios.delete(`/movies/${id}`);
      setMovies(movies.filter(book => book.id !== id));
    }
  };

  return (
    <><h1>Books</h1><div className="card shadow mb-4">
          <div className="card-header py-3">
              <div className="float-right">
                <Link to="/createmovie"><button className='btn btn-primary' >Create new</button></Link>
              </div>
          </div>

          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Genre</th>
                      <th>Content</th>
                      <th>Description</th>
                      <th>Image</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {movies.map(movie => (
                      <tr key={movie.id}>
                          <td>{movie.id}</td>
                          <td>{movie.title}</td>
                          <td>{movie.author}</td>
                          <td>{movie.genre}</td>
                          <td>{movie.content}</td>
                          <td>{movie.desription}</td>
                          <td>{movie.year}</td>
                          <td> 
                            <img src={movie.image} alt='' style={{width:"200px", height:"250px", objectFit:"cover"}}/>
                          </td>
                          <td>
                          <Link to={`/editmovies/${movie.id}`}><button className='btn btn-primary'>Edit</button></Link>
                              <button className='btn btn-danger' onClick={() => handleDelete(movie.id)}>Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div></>
  );
}

export default MovieList;
