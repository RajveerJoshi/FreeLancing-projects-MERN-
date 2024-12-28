import React from 'react';

const ActiveProjects = () => {
  // Mock data
  const projects = [
    { id: 1, title: 'Website Redesign', status: 'In Progress' },
    { id: 2, title: 'Mobile App Development', status: 'Completed' },
  ];

  return (
    <div className="active-projects">
      <h2>Active Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <strong>{project.title}</strong> - {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveProjects;
