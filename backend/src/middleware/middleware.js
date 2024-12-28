const User = require("../model/user");
const jwt = require("jsonwebtoken");
const seCretKey = "seCretKey";

const authVerify = async (req, res, next) => {
    console.log("authVerify call");
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header not provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, seCretKey);
        const user = await User.findById(decoded.userId);  // Use await to get the user data

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

req.user = user;

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token or authentication failed" });
    }
};


const adminVerify=async(req,res,next)=>{
    authVerify(req,res,async()=>{
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied, admin only" });
        }
        next()
    })

}


const clientVerify=async(req,res,next)=>{
    authVerify(req,res,async()=>{
console.log(req.user.role)
console.log(req.user)

        if (req.user.role !== 'client') {
            return res.status(403).json({ message: "Access denied, client only" });

        }
        next()

    })

}
module.exports = { authVerify,adminVerify,clientVerify};
