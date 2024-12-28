const mongoose=require("mongoose")


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role:{type:String,enum:["client","freelancer,admin"]},
    verificationKey: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    skills: { type: [String] },  // Checkbox: Multiple skills can be selected
    portfolioLinks: { type: [String] },  // Multiple links, possibly from a textarea input
    professionalTitle: { type: String },  // Dropdown: Single selected title
    experienceLetter: { type: [String] },  // Can store multiple documents
    profilePicture: { type: String }, 
     // URL of the profile picture
    projectLinks: { type: [String] },  // Checkbox or textarea input for multiple links
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other'] },  // Radio button or dropdown
    jobType: { type: String, enum: ['full-time', 'part-time', 'freelancer', 'internship'] },  // Dropdown
    isAvailableForHire: { type: Boolean, default: false },  // Checkbox: True/False value
    location: { type: String },  // Text input
    jobDescription: { type: String },  // Textarea for a brief description
    socialLinks: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String }
      
    },  // Object to store multiple social media links
    languagePreferences: { type: [String] },  // Checkbox for selecting multiple languages
    workExperience: [
      {
        company: { type: String },
        role: { type: String },
        duration: { type: String }  // Could be a dropdown or text input for duration
      }
    ],  // Array of objects for dynamic work experience entries
    education: [
      {
        institution: { type: String },
        course: { type: String },
        fieldOfStudy: { type: String },
        graduationYear: { type: Number }  // Dropdown or text input
      }
    ],  // Array of objects for dynamic education entries
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  });
  
  module.exports = mongoose.model('User', userSchema);
  