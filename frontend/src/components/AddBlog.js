import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = ({ onAddBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [drinks, setDrinks] = useState([]); // Use a separate state for drinks

  const handleAddBlog = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content.');
      return;
    }
    const newBlog = {
      title,
      content,
    };

    onAddBlog(newBlog);
    setTitle('');
    setContent('');
  };

  const fetchDrinksData = async () => {
    const res = await axios.get("/drinks");
    setDrinks(res.data); // Update the drinks state, not blogs
    console.log("drinks", res.data);
  };

  const renderDrinks = () => {
    return drinks.map((drink) => ( // Map over drinks, not blogs
      <div key={drink.id}>
        <p>{drink.title}</p>
      </div>
    ));
  };

  return (
    <>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', marginBottom: '20px', marginTop:`30px` }}>
        <h2>Add a New Blog</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }}
          ></textarea>
        </div>
        <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={handleAddBlog}>
          Add Blog
        </button>
      </div>

      <button onClick={fetchDrinksData}>Fetch Drinks</button>
      {renderDrinks()}
    </>
  );
};

export default AddBlog;
