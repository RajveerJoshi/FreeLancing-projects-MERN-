import React, { useState } from 'react';
import './clientDashboard.css';
import ProfileSummary from './ProfileSummary';
import ActiveProjects from './ActiveProject';
import Notifications from './Notification';
import Settings from './Setting';
import CreatePost from './CreatePost';
import MyPosts from './MyPosts';  // New import for My Posts component


const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <aside className="dashboard-sidebar">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarCollapsed ? 'Expand' : 'Collapse'}
        </button>
        <ul className="sidebar-menu">
          <li
            className={activeSection === 'Profile' ? 'active' : ''}
            onClick={() => handleSectionChange('Profile')}
          >
            Profile
          </li>
          <li
            className={activeSection === 'Active Projects' ? 'active' : ''}
            onClick={() => handleSectionChange('Active Projects')}
          >
            Active Projects
          </li>
          <li
            className={activeSection === 'Notifications' ? 'active' : ''}
            onClick={() => handleSectionChange('Notifications')}
          >
            Notifications <span className="notification-count">3</span>
          </li>
          <li
            className={activeSection === 'Settings' ? 'active' : ''}
            onClick={() => handleSectionChange('Settings')}
          >
            Settings
          </li>
          <li
            className={activeSection === 'Create Post' ? 'active' : ''}
            onClick={() => handleSectionChange('Create Post')}
          >
            Create Post
          </li>
          <li
            className={activeSection === 'My Posts' ? 'active' : ''}
            onClick={() => handleSectionChange('My Posts')}
          >
            My Posts
          </li>
          <li
            className={activeSection === 'Manage Posts' ? 'active' : ''}
            onClick={() => handleSectionChange('Manage Posts')}
          >
            Manage Posts
          </li>
        </ul>
      </aside>
      
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>Client Dashboard</h1>
          <div className="user-info">
            <span>Welcome, Client Name</span>
            <img src="profile-pic-url" alt="Profile" className="profile-pic" />
            <div className="settings-dropdown">
              <button className="settings-button">⚙️</button>
              <ul className="dropdown-menu">
                <li>Account Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          {activeSection === 'Profile' && <ProfileSummary />}
          {activeSection === 'Active Projects' && <ActiveProjects />}
          {activeSection === 'Notifications' && <Notifications />}
          {activeSection === 'Settings' && <Settings />}
          {activeSection === 'Create Post' && <CreatePost />}
          {activeSection === 'My Posts' && <MyPosts />}  
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
