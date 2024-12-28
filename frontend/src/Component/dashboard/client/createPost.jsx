import React, { useState } from 'react';
import './createPost.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title,
      description,
      skills: skills.split(',').map(skill => skill.trim()), // Convert comma-separated skills into an array
    };
    console.log('Post Data:', postData);
    // Here you would send the postData to your backend API
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            required
          />
        </div>
        <div className="form-group">
          <label>Project Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Required Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter required skills, separated by commas"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
