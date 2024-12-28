import React from 'react';

const Notifications = () => {
  // Mock data
  const notifications = [
    { id: 1, message: 'Your project "Website Redesign" has been updated.' },
    { id: 2, message: 'You have a new message from a freelancer.' },
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
