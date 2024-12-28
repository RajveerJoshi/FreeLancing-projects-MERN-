import React from 'react';

const ProfileSummary = () => {
  // Mock data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
  };

  return (
    <div className="profile-summary">
      <h2>Profile Summary</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Location:</strong> {user.location}</p>
    </div>
  );
};

export default ProfileSummary;
