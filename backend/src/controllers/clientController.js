const clientService=require("../services/clientServices")


const createPost= async(req,res,next)=>{
const postData=req.body
    const { _id } = req.user; // Ensure the user ID is obtained correctly

    try {
        const response=await clientService.createPost(_id,postData)
        return res.status(200).json({data:response})
        
    } catch (error) {
        
console.log(error)
return res.status(400).json({ error: error.message });

    }

}


module.exports={createPost}