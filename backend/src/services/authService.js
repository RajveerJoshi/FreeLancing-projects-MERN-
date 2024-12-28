const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const seCretKey = "seCretKey";
const multer=require('multer')

const { sendEmail } = require('../utils/email');
const { generateOTP } = require('../utils/otp');



const storage=multer.diskStorage({
    destination:function(req,file,cb){
cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+Date.now()+file.originalname)
    }
})
upload=multer({storage})

const uploadFields=upload.fields([
    { name: 'experienceLetter', maxCount: 10 }, // Adjust maxCount as needed
    { name: 'profilePicture', maxCount: 1 },
    { name: 'otherDoc', maxCount: 10 }
  ])

// const updateProfile=async(_id,updateData)=>{
//     console.log(updateData)
//     const user=await User.findByIdAndUpdate(_id,updateData,{new:true})
//     if(!user){
//         throw new Error("Id Not Found")
//     }
//     console.log( "after updqate", user)
    
//     return {message:"Update Profile Successfully",updateData}
//     }


const updateProfile = async (_id, updateData) => {
  
    // Check if the user exists
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Id Not Found");
    }
  
    // Update fields for experienceLetter, profilePicture, and otherDoc
    if (updateData.experienceLetter) {
      user.experienceLetter=updateData.experienceLetter;  // Add new file paths to the array
    }
  
    if (updateData.profilePicture) {
      user.profilePicture = updateData.profilePicture;  // Update profile picture path
    }
  
    // user.gender= updateData.gender;
    // user.jobType= updateData.jobType;
    // user.skills=[...updateData.skills]
    await user.save();
    console.log("user--",user)
    return { message: "Update Profile Successfully", user };
  };
  



const signUp = async (email, password, name,role) => {
    // Check if email already exists in the database

    if(!email|| !password|| !name){
throw new Error("All Field Required")
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        if (existingUser.status === 'inactive') {
            // Resend verification email with a new verification key
            // const newVerificationKey = crypto.randomBytes(32).toString('hex');
            const newVerificationKey = await generateOTP();
            existingUser.verificationKey = newVerificationKey;
            await existingUser.save();
const emailTemplate=`your verification key is ${newVerificationKey}`
            // Send verification email
            await sendEmail(email, emailTemplate);
            return {  message: 'OTP sent successfully, Please check your email.'};       
        } else {
            throw new Error('Email already in use');  // Throw an error for missing fields
        //    return {error: 'Email already in use', statusCode: 400};
        }
    } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate verification key
        const verificationKey = generateOTP();
const emailTemplate=`your verification key is ${verificationKey}`
        // Create a new user with inactive status
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationKey,
            status: 'inactive',
            role:role
        });

        await user.save();

        // Send verification email
        await sendEmail(email, emailTemplate);

        return {  message: 'OTP sent successfully, Please check your email.'};
    }
};



const login=async ( email, login_password) => {
 
    // Validate input
    if (!email || !login_password) {
        throw new Error('All fields are required');  // Throw an error for missing fields
    }

    // Check if the user exists and is active
    const user = await User.findOne({ email, status: 'active' });
    if (!user) {
        throw new Error('Invalid credentials');  // Throw an error if user is not found
    }

    // Check password
    const isMatch = await bcrypt.compare(login_password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');  // Throw an error if password is incorrect
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, seCretKey, { expiresIn: '1h' });

const{password,verificationKey, ...data}=user.toObject()
return { token, message: 'Login successful', data };  // Return the token and user data
};



const verifyOtp = async (email, otp) => {
    // Validate input
    if (!email || !otp) {
        throw new Error ('All fields are required');
    }


        console.log("otp", otp); // Log the OTP for debugging

        // Check if the user exists and the OTP matches
        const user = await User.findOne({ email, verificationKey: otp });
        if (!user) {
            throw new Error ( 'Invalid OTP');
        }

        // Check if the user is inactive
        if (user.status == 'active') {
            return { message: 'OTP verified successfully, create a new password.'};
        }
   
        // Activate the user
        user.status = 'active';
        await user.save();
        return { message: 'OTP verified successfully, go to the login page.' };

 
};


const resendOtp= async (email) => {


    // Validate input
    if (!email) {
        throw new Error("Email is required")
    }

    // Check if the user exists and is inactive
    const user = await User.findOne({ email });
    if (!user) {
       throw new Error('Email not found  please enter a valid email');
    }

    // Generate new OTP
    const newOtp = generateOTP();
    
    user.verificationKey = newOtp;
    await user.save();
    await sendEmail(email,newOtp);

    return {  message: 'Resend OTP  successfully sent on your email, Please check your email.'};
};


const forgotPassword = async (email) => {
    // Validate input
    if (!email) {
       throw new Error('Email is required');
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error ('Email not found');
    }

    // Generate password reset token
    // const resetToken = crypto.randomBytes(32).toString('hex');
    const otp = generateOTP();

    // user.resetPasswordToken = resetToken;
    // user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    user.verificationKey=otp;

    await user.save();
    await sendEmail(email, otp);
    return {  message: 'OTP sent successfully, Please check your email.'};
};


const createNewPassword =async (email, password ) => {


    // Validate input
    if (!email || !password) {
        throw new Error('All fields are required');
    }

    // Find user with the reset token and check if token is valid
    const user = await User.findOne({email});

    if (!user) {
       throw new Error('invalid email,please send the valid email');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return { message: 'Password updated successfully'};
};





module.exports = {
    signUp,login,verifyOtp,resendOtp,forgotPassword,createNewPassword,updateProfile,uploadFields
};
