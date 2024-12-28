const authService = require("../services/authService");

const signUp = async (req, res) => {
  const { email, password, name,role } = req.body;

  try {
    const response = await authService.signUp(email, password, name,role);
   return res.status(200).json(response);
  } catch (error) {

    if (error.message === "All Field Required") {
 return     res.status(400).json({ error: error.message });
    } else if (error.message === "Email already in use") {
    return  res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" }); // For any unexpected errors
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authService.login(email, password);
    res.status(200).json(response);
  } catch (error) {
    // Handle errors and send appropriate status codes
    if (error.message === "All fields are required") {
      return res.status(400).json({ error: error.message });
    } else if (error.message === "Invalid credentials") {
      return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" }); // For any unexpected errors
    }
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const response = await authService.verifyOtp(email, otp);
    res.status(200).json(response);
  } catch (error) {
    if (error.message === "All fields are required")
      return res.status(400).json({ error: error.message });
    else if (error.message === "Invalid OTP") {
      return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" }); // For any unexpected errors
    }
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await authService.resendOtp(email);
    res.status(200).json(response);
  } catch (error) {
    if (error.message === "Email is required")
      return res.status(400).json({ error: error.message });
    else if (error.message === "Email not found  please enter a valid email") {
        return res.status(401).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" }); // For any unexpected errors
    }
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const response = await authService.forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    if(error.message==="Email is required"){
        res.status(400).json({ error: error.message });
    }
    else if(error.message==="Email not found"){
        res.status(401).json({ error: error.message });
    }
    else{
        res.status(500).json({error:"Internal Server Error"})
    }
  }
};

const createNewPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await authService.createNewPassword(email, password);
    res.status(200).json(response);
  } catch (error) {
    if(error.message==="'All fields are required"){

        res.status(400).json({ error: error.message });
    }
    else if(error.message==='invalid email,please send the valid email'){
        res.status(401).json({ error: error.message });
    }
  }
};

// const updateProfile = async (req, res) => {
//   const {_id} = req.user;

//   const updateData=req.body


//   try {
//       const response = await authService.updateProfile(_id,updateData);
//       res.status(200).json(response);
//   } catch (error) {
//     if(error.message==="Id Not Found"){

//      return  res.status(400).json({ error: error.message });
//     }
//     else{
//       return  res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };




const updateProfile = async (req, res) => {
  
  
  const { _id } = req.user; // Ensure the user ID is obtained correctly
  let updateData = req.body;


  try {
    // Handle file uploads and add them to updateData
    if (req.files) {
      if (req.files.experienceLetter) {
        updateData.experienceLetter = req.files.experienceLetter.map(file => file.path);
      }
      if (req.files.profilePicture) {
        console.log("req.files.profilePicture",req.files.profilePicture)

        updateData.profilePicture = req.files.profilePicture[0].path;
      }
      if (req.files.otherDoc) {

        updateData.otherDoc = req.files.otherDoc.map(file => file.path);
      }
    }

    // Call the service function to update profile
    const response = await authService.updateProfile(_id, updateData);
    res.status(200).json(response);

  } catch (error) {
    if (error.message === "Id Not Found") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  signUp,
  login,
  verifyOtp,
  resendOtp,
  forgotPassword,
  createNewPassword,
  updateProfile,
};
