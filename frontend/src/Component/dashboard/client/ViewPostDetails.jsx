import React from 'react';
import './viewPostDetails.css';

const ViewPostDetails = ({ post }) => {
  return (
    <div className="view-post-details">
      <div className="post-overview">
        <h1>{post?.title}</h1>
        <p>Status: <span className={`status-${post?.status.toLowerCase()}`}>{post?.status}</span></p>
        <p>Posted on: {post?.postDate}</p>
        <p>Last updated: {post?.lastUpdated}</p>
      </div>
      
      <div className="project-description">
        <h2>Description</h2>
        <p>{post?.description}</p>
      </div>
      
      <div className="required-skills">
        <h2>Required Skills</h2>
        <ul>
          {post?.skills.map(skill => <li key={skill}>{skill}</li>)}
        </ul>
      </div>
      
      <div className="attached-files">
        <h2>Attached Files</h2>
        {post?.attachments.map(file => (
          <div key={file.id} className="file-item">
            <a href={file.url} download>{file.name}</a>
          </div>
        ))}
      </div>
      
      <div className="freelancer-applications">
        <h2>Freelancer Applications</h2>
        <ul>
          {post?.applications.map(application => (
            <li key={application.id} className="application-item">
              <div className="applicant-info">
                <span className="applicant-name">{application?.freelancerName}</span>
                <span className="bid-amount">${application?.bidAmount}</span>
              </div>
              <div className="application-actions">
                <button>View Proposal</button>
                <button>Shortlist</button>
                <button>Reject</button>
                <button>Message</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="project-actions">
        <button>Edit Post</button>
        <button>Close Post</button>
        <button>Repost Project</button>
      </div>
      
      <div className="activity-log">
        <h2>Activity Log</h2>
        <ul>
          {post?.activityLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewPostDetails;
