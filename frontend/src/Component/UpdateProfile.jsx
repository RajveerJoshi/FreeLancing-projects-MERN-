import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    skills: [],
    portfolioLinks: [],
    professionalTitle: "",
    experienceLetter: [],
    profilePicture: "",
    projectLinks: [],
    gender: "",
    jobType: "",
    isAvailableForHire: false,
    location: "",
    jobDescription: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: ""
    },
    languagePreferences: [],
    workExperience: [{ company: "", role: "", duration: "" }],
    education: [{ institution: "", fieldOfStudy: "", graduationYear: "" }]
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleFormDataApi = async () => {
    try {
      const token = Cookies.get('token'); // Assuming token is stored in cookies
      const data = new FormData();

      // Append all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // If it's an array, append each element separately
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              Object.entries(item).forEach(([subKey, subValue]) => {
                data.append(`${key}[${index}][${subKey}]`, subValue);
              });
            } else {
              data.append(`${key}[]`, item);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          // If it's an object, assume it's the `socialLinks` object
          Object.entries(value).forEach(([subKey, subValue]) => {
            data.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          data.append(key, value);
        }
      });

      const res = await axios.post("http://localhost:4000/api/update-profile", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log('Response from server:', res.data);
    } catch (error) {
      console.error('Error during API call:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormDataApi();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Profile</h1>
      
      <label>Name</label>
      <input
        type='text'
        onChange={handleOnChange}
        name='name'
        value={formData.name}
        placeholder='Name'
      /><br /><br />

      <label>Portfolio Links</label>
      <input
        type='text'
        name='portfolioLinks'
        onChange={handleOnChange}
        value={formData.portfolioLinks[0] || ""}
        placeholder='Portfolio Links'
      /><br /><br />

      <label>Professional Title</label>
      <input
        type='text'
        name='professionalTitle'
        onChange={handleOnChange}
        value={formData.professionalTitle}
        placeholder='Professional Title'
      /><br /><br />

      <label>Experience Letter</label>
      <input
        type='file'
        name='experienceLetter'
        onChange={handleFileChange}
        multiple
      /><br /><br />

      <label>Profile Picture</label>
      <input
        type='file'
        name='profilePicture'
        onChange={handleFileChange}
      /><br /><br />

      <label>Gender</label>
      <input
        type='radio'
        onChange={handleOnChange}
        value="male"
        checked={formData.gender === "male"}
        name="gender"
      /> Male
      <input
        type='radio'
        onChange={handleOnChange}
        value="female"
        checked={formData.gender === "female"}
        name="gender"
      /> Female
      <input
        type='radio'
        onChange={handleOnChange}
        value="other"
        checked={formData.gender === "other"}
        name="gender"
      /> Other
      <br /><br />

      <label>Job Type</label>
      <select
        onChange={handleOnChange}
        name='jobType'
        value={formData.jobType}
      >
        <option value="part-time">Part-Time</option>
        <option value="full-time">Full-Time</option>
        <option value="freelancer">Freelancer</option>
        <option value="internship">Internship</option>
      </select><br /><br />

      <label>
        <input
          type='checkbox'
          name='isAvailableForHire'
          onChange={handleOnChange}
          checked={formData.isAvailableForHire}
        />
        Is Available For Hire
      </label><br /><br />

      <label>Location</label>
      <input
        type='text'
        name='location'
        onChange={handleOnChange}
        value={formData.location}
        placeholder='Location'
      /><br /><br />

      <label>Job Description</label>
      <input
        type='text'
        name='jobDescription'
        onChange={handleOnChange}
        value={formData.jobDescription}
        placeholder='Job Description'
      /><br /><br />

      <label>Social Links</label><br />
      <label>LinkedIn</label>
      <input
        type='text'
        name='linkedin'
        onChange={(e) => setFormData({
          ...formData,
          socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
        })}
        value={formData.socialLinks.linkedin}
      /><br />

      <label>GitHub</label>
      <input
        type='text'
        name='github'
        onChange={(e) => setFormData({
          ...formData,
          socialLinks: { ...formData.socialLinks, github: e.target.value }
        })}
        value={formData.socialLinks.github}
      /><br />

      <label>Twitter</label>
      <input
        type='text'
        name='twitter'
        onChange={(e) => setFormData({
          ...formData,
          socialLinks: { ...formData.socialLinks, twitter: e.target.value }
        })}
        value={formData.socialLinks.twitter}
      /><br /><br />

      <label>Language Preferences</label>
      <input
        type='text'
        name='languagePreferences'
        onChange={handleOnChange}
        value={formData.languagePreferences.join(', ')}
        placeholder='Language Preferences'
      /><br /><br />

      <label>Work Experience</label><br />
      {formData.workExperience.map((exp, index) => (
        <div key={index}>
          <label>Company</label>
          <input
            type='text'
            name='company'
            onChange={(e) => {
              const updatedExperience = [...formData.workExperience];
              updatedExperience[index].company = e.target.value;
              setFormData({ ...formData, workExperience: updatedExperience });
            }}
            value={exp.company}
            placeholder='Company'
          />

          <label>Role</label>
          <input
            type='text'
            name='role'
            onChange={(e) => {
              const updatedExperience = [...formData.workExperience];
              updatedExperience[index].role = e.target.value;
              setFormData({ ...formData, workExperience: updatedExperience });
            }}
            value={exp.role}
            placeholder='Role'
          />

          <label>Duration</label>
          <input
            type='text'
            name='duration'
            onChange={(e) => {
              const updatedExperience = [...formData.workExperience];
              updatedExperience[index].duration = e.target.value;
              setFormData({ ...formData, workExperience: updatedExperience });
            }}
            value={exp.duration}
            placeholder='Duration'
          />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({
        ...formData,
        workExperience: [...formData.workExperience, { company: "", role: "", duration: "" }]
      })}>Add More Experience</button><br /><br />

      <label>Education</label><br />
      {formData.education.map((edu, index) => (
        <div key={index}>
          <label>Institution</label>
          <input
            type='text'
            name='institution'
            onChange={(e) => {
              const updatedEducation = [...formData.education];
              updatedEducation[index].institution = e.target.value;
              setFormData({ ...formData, education: updatedEducation });
            }}
            value={edu.institution}
            placeholder='Institution'
          />

          <label>Field of Study</label>
          <input
            type='text'
            name='fieldOfStudy'
            onChange={(e) => {
              const updatedEducation = [...formData.education];
              updatedEducation[index].fieldOfStudy = e.target.value;
              setFormData({ ...formData, education: updatedEducation });
            }}
            value={edu.fieldOfStudy}
            placeholder='Field of Study'
          />

          <label>Graduation Year</label>
          <input
            type='text'
            name='graduationYear'
            onChange={(e) => {
              const updatedEducation = [...formData.education];
              updatedEducation[index].graduationYear = e.target.value;
              setFormData({ ...formData, education: updatedEducation });
            }}
            value={edu.graduationYear}
            placeholder='Graduation Year'
          />
        </div>
      ))}
      <button type="button" onClick={() => setFormData({
        ...formData,
        education: [...formData.education, { institution: "", fieldOfStudy: "", graduationYear: "" }]
      })}>Add More Education</button><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateProfile;
