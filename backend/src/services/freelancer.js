
const User=require("../model/user")
const ClientPost=require("../model/clientpost")
const { sendVerificationEmail, sendEmail } = require("../utils/email")

const getClientPost=async()=>{
const getAllPost= await ClientPost.find()
if(!getAllPost){
    throw Error("getAllPost not fetch")
}
return {data:getAllPost}
}



const applyProject = async (projectId, freelancerId) => {
    try {
      // Input validation
      if (!projectId) {
        throw new Error("Project ID is required.");
      }
  
      if (!freelancerId) {
        throw new Error("Freelancer ID is required.");
      }
  
      // Fetch the client details using the project ID
      const clientDetails = await ClientPost.findById(projectId).populate('clientId');
  
      if (!clientDetails) {
        throw new Error("Client details could not be fetched for the given project ID.");
      }
  
      console.log("clientDetails:", clientDetails);
  
      // Assume you want to send an email to the client of the project
      const clientEmail = clientDetails.clientId.email;
      
      if (!clientEmail) {
        throw new Error("Client email is not available.");
      }
  

      const freelancerDetails = await User.findById(freelancerId);

      if (!freelancerDetails) {
        throw new Error("Freelancer details could not be fetched for the given freelancer ID.");
      }


      // Construct the email template
      const emailTemplate = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

      <p>Dear ${clientDetails.clientId.name},</p>
      <p>A freelancer with ID: ${freelancerDetails.name} has applied for your project titled ${clientDetails.projectTitle}".</p>
      <p>Please review the application and proceed accordingly.</p>
      <p>Best regards,<br/>Freelance Marketplace Team</p>

        
</body>
</html>
       


      `;
  
      // Send an email to the client
      await sendEmail(clientEmail, emailTemplate);
  
      return { data: clientDetails };
    } catch (error) {
      // Log and re-throw the error for further handling
      console.error("Error in applyProject function:", error.message);
      throw error;
    }
  };
  


module.exports={getClientPost,applyProject}