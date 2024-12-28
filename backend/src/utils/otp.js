const generateOTP= ()=> {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number from 1000 to 9999
    return otp.toString();
  }

module.exports={generateOTP}