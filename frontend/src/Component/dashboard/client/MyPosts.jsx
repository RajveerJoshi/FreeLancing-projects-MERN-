import React from 'react';
import './myPosts.css';
import { Link } from 'react-router-dom';

const MyPosts = () => {
  const posts = [
    { id: 1, title: 'Website Development', status: 'Open', applications: 5 },
    { id: 2, title: 'Mobile App Design', status: 'Closed', applications: 12 },
    // More posts...
  ];

  return (
    <div className="my-posts-container">
      <h2>My Posts</h2>

      
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className={`post-item ${post.status.toLowerCase()}`}>
            <h3>{post.title}</h3>
            <p>Status: {post.status}</p>
            <p>Applications: {post.applications}</p>
        <Link to={"/viewpostdetails"}>  <button>View Details</button></Link>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;
